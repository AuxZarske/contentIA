import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:8080'

export const store = new Vuex.Store({
  state: {
    user: null, // q guarda?
    token: null, // este agrege yo, descartarlo luego
    loading: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    destroyToken (state) {
      state.token = null
    },
    retrieveToken (state, token) {
      state.token = token
    }
  },
  actions: {
    signupUser ({commit}, payload) {
      const newUser = {
        fname: payload.fname,
        lname: payload.lname,
        email: payload.email,
        mobile: payload.mobile,
        role: payload.role
      }
      // window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload.token
      commit('setUser', newUser)
      window.lsd.set('user', newUser)
      window.lsd.set('token', payload.token)
    },
    signinUser ({commit}, payload) {
      const newUser = {
        fname: payload.fname,
        lname: payload.lname,
        email: payload.email,
        mobile: payload.mobile,
        role: payload.role
      }
      commit('setUser', newUser)
      window.lsd.set('user', newUser)
      console.log('act2')
      window.lsd.set('token', payload.token)
    },
    retrieveToken (context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/v1.0/usersManage/login/', {
          username: credentials.username,
          password: credentials.password
        })
          .then(response => {
            const token = response.data.key
            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
            console.log(response)
            // nuevo
            console.log(this.state)
            const newUser = {
              fname: credentials.username,
              lname: credentials.username,
              email: 'hyu@gmail.com',
              mobile: 'payload.mobile',
              role: 'payload.role'
            }
            window.lsd.set('user', newUser)
            window.lsd.set('token', token)
            // context.commit('addTodo', response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    updateUser ({commit}, payload) {
      const updateUser = {
        fname: payload.fname,
        lname: payload.lname,
        email: payload.email,
        mobile: payload.mobile,
        role: payload.role
      }
      commit('setUser', updateUser)
      console.log('act3')
      window.lsd.set('user', updateUser)
    },
    loading ({commit}, payload) {
      commit('setLoading', payload)
    },
    checkAuth ({commit}, payload) {
      if (window.lsd.get('user') && window.lsd.get('token')) {
        let u = window.lsd.get('user')
        const user = {
          fname: u.fname,
          lname: u.lname,
          email: u.email,
          mobile: u.mobile,
          role: u.role
        }
        const token = window.lsd.get('token')
        commit('setUser', user)
        window.lsd.set('token', token)
        this.state.token = token
        console.log('act4')
      } else {
        commit('setUser', null)
        console.log('act5')
        window.lsd.set('user', null)
        window.lsd.set('token', null)
        window.axios.defaults.headers.common['Authorization'] = null
      }
    },
    signoutUser ({commit}, payload) {
      commit('setUser', payload)
      console.log('act6')
      window.lsd.set('user', payload)
      window.lsd.set('token', payload)
      window.axios.defaults.headers.common['Authorization'] = payload
    },
    destroyToken (context) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + context.state.token
      if (context.getters.isUserAuthenticated) {
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8000/api/v1.0/usersManage/logout/')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
              // console.log(response);
              // context.commit('addTodo', response.data)
              window.lsd.set('user', null)
              window.lsd.set('token', null)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              window.lsd.set('user', null)
              window.lsd.set('token', null)
              reject(error)
            })
        })
      }
    }
  },
  getters: {
    isUserAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    },
    user (state) {
      return state.user
    },
    tokenData (state) {
      console.log(state)
      return state.token
    },
    loading (state) {
      return state.loading
    }
  }
})
