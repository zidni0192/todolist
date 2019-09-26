import React, { Component } from 'react';
import './App.css';
import './todomvc-app-css/index.css';
import './todomvc-common/base.css';
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      statusList: 'all',
      edit: {},
      categoryFilter: 'all'
    }
  }
  componentDidMount = async () => {
    this.props.dispatch({ type: "USER_FETCH_REQUESTED" })
    if (localStorage.getItem('list')) {
      await this.setState({ list: JSON.parse(localStorage.getItem('list')) })
    } else {
      await this.setState({ list: [] })
    }
  }
  destroy = (item) => {
    const index = this.state.list.indexOf(item)
    this.state.list.splice(index, 1)
    localStorage.setItem('list', JSON.stringify(this.state.list))
    this.setState({ list: this.state.list })
  }
  setStatusItem = (item) => {
    const index = this.state.list.indexOf(item)
    this.state.list[index].status = item.status === 'completed' ? 'pending' : 'completed'
    localStorage.setItem('list', JSON.stringify(this.state.list))
    this.setState({ list: this.state.list })
  }

  triggerEdit = (item) => {
    this.setState({ edit: item })
    document.getElementsByClassName('edit')[this.state.list.indexOf(item)].style.display = 'block'
    document.getElementsByClassName('view')[this.state.list.indexOf(item)].style.display = 'none'
  }
  renderList = () => {
    if (this.state.statusList === 'complete') {
      return this.state.list.filter((item) => {
        if (item.status === 'completed') {
          if (this.state.categoryFilter !== 'all') {
            if (item.category === this.state.categoryFilter) {
              return item
            }
          } else {
            return item
          }
        }
      }).map((item, key) => (
        <li className={item.status === 'completed' && 'completed'}>
          <div className="view" onDoubleClick={() => this.triggerEdit(item)}>
            <input className="toggle" type="checkbox" checked={item.status === 'completed' ? true : false} onClick={() => this.setStatusItem(item)} />
            <label>{item.name}</label>
            <label className={'itemCategory'}>category:{item.category}</label>
            <button className="destroy" onClick={() => this.destroy(item)}></button>
          </div>
          <input className="edit" value={this.state.edit.name} onKeyUp={(evt) => this.edit(evt)} onChange={(evt) => this.onChanged(evt)} />
        </li>
      )
      )
    } else if (this.state.statusList === 'active') {
      return this.state.list.filter((item) => {
        if (item.status !== 'completed') {
          if (this.state.categoryFilter !== 'all') {
            if (item.category === this.state.categoryFilter) {
              return item
            }
          } else {
            return item
          }
        }
      }).map((item, key) => (
        <li className={item.status === 'completed' && 'completed'}>
          <div className="view" onDoubleClick={() => this.triggerEdit(item)}>
            <input className="toggle" type="checkbox" checked={item.status === 'completed' ? true : false} onClick={() => this.setStatusItem(item)} />
            <label>{item.name}</label>
            <label className={'itemCategory'}>category:{item.category}</label>
            <button className="destroy" onClick={() => this.destroy(item)}></button>
          </div>
          <input className="edit" value={this.state.edit.name} onKeyUp={(evt) => this.edit(evt)} onChange={(evt) => this.onChanged(evt)} />
        </li>
      )
      )
    } else {
      return this.state.list.filter((item) => this.state.categoryFilter === 'all' ? item : item.category === this.state.categoryFilter).map((item, key) => (
        <li className={item.status === 'completed' && 'completed'}>
          <div className="view" onDoubleClick={() => this.triggerEdit(item)}>
            <input className="toggle" type="checkbox" checked={item.status === 'completed' ? true : false} onClick={() => this.setStatusItem(item)} />
            <label>{item.name}</label>
            <label className={'itemCategory'}>category:{item.category}</label>
            <button className="destroy" onClick={() => this.destroy(item)}></button>
          </div>
          <input className="edit" value={this.state.edit.name} onKeyUp={(evt) => this.edit(evt)} onChange={(evt) => this.onChanged(evt)} />
        </li>
      )
      )
    }
  }
  onChanged = (evt) => {
    this.state.edit.name = evt.target.value
    this.setState({ edit: this.state.edit })
  }
  edit = (evt) => {
    if (evt.keyCode === 13) {
      let index = this.state.list.indexOf(this.state.edit)
      this.state.list[index] = this.state.edit
      evt.target.value = ''
      localStorage.setItem('list', JSON.stringify(this.state.list))
      document.getElementsByClassName('edit')[index].style.display = 'none'
      document.getElementsByClassName('view')[index].style.display = 'block'
      this.setState({ list: this.state.list, edit: {} })
    }
  }
  tambah = (evt) => {
    if (evt.keyCode === 13) {
      this.state.list.push({ status: 'pending', name: evt.target.value, category: document.getElementById('category').value })
      evt.target.value = ''
      localStorage.setItem('list', JSON.stringify(this.state.list))
      this.setState({ list: this.state.list })
    }
  }
  clearCompleted = async () => {
    await this.state.list.forEach((item) => {
      if (item.status === 'completed') {
        const index = this.state.list.indexOf(item)
        this.state.list.splice(index, 1)
      }
    })
    localStorage.setItem('list', JSON.stringify(this.state.list))
    this.setState({ list: this.state.list })
  }
  render() {
    console.log(this.props)
    const complete = this.state.list.filter((itemCompleted) => itemCompleted.status !== 'completed')
    return (
      <div>
        <div className="todoapp">
          <div className="header">
            <h1>Todos</h1>
            <select className={'category'} id={'category'}>
              <option value={1}>
                1
            </option>
              <option value={2}>
                2
            </option>
              <option value={3}>
                3
            </option>
            </select>
            <input className="new-todo" placeholder="What needs to be done?" autofocus onKeyUp={(evt) => this.tambah(evt)} />
          </div>
          <div className="main">
            <ul className="todo-list">
              {this.renderList()}
            </ul>
          </div>
          <div className="footer">
            <span className="todo-count"><strong>{complete.length}</strong> item left</span>
            <ul className="filters">
              <li>
                <a className={this.state.statusList === 'all' && "selected"} onClick={() => this.setState({ statusList: 'all' })}>All</a>
              </li>
              <li>
                <a className={this.state.statusList === 'active' && "selected"} onClick={() => this.setState({ statusList: 'active' })}>Active</a>
              </li>
              <li>
                <a className={this.state.statusList === 'complete' && "selected"} onClick={() => this.setState({ statusList: 'complete' })}>Completed</a>
              </li>
              {console.log(this.state)}
              <li>
                <select className={'categoryFilter'} onChange={(evt) => this.setState({ categoryFilter: evt.target.value })}>
                  <option value={'all'}>
                    All
                </option>
                  <option value={1}>
                    1
                </option>
                  <option value={2}>
                    2
                </option>
                  <option value={3}>
                    3
                </option>
                </select>
              </li>
            </ul>
            <button className="clear-completed" onClick={() => this.clearCompleted()}>Clear completed</button>
          </div>
        </div>
        <footer class="info">
          <p>Double-click to edit a todo</p>

        </footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(App);
