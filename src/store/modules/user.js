const state = () => ({
    created_at: '',
    token: '',
    username: '',
    authenticated: false,
})

const getters = {
    userToken: (state) => {
        return state.token
    },
    username: (state) => {
        return state.username
    },
    userCreated: (state) => {
        return state.created_at
    },
    isAuthenticated: (state) => {
        return state.authenticated
    }
}

// actions
const actions = {
    authUser ({ commit }, user) {
        console.log(user)
        commit('setToken', user.token)
        commit('setUsername', user.username)
        commit('setCreatedAt', user.created_at)
        commit('setAuthenticated', user.authenticated)
    },
    deleteUser ({ commit }) {
        commit('setInitialState')
    }
}

// mutations
const mutations = {
    setToken (state, token) {
        console.log('Token: ' + token)
        state.token = token
    },
    setUsername (state, username) {
        console.log('Username: ' + username)
        state.username = username
    },
    setCreatedAt (state, createdAt) {
        console.log('Created At: ' + createdAt)
        state.created_at = createdAt
    },
    setAuthenticated (state, authenticated) {
        console.log('Authenticated: ' + authenticated)
        state.authenticated = authenticated
    },
    setInitialState(state) {
        state.token = ''
        state.username = ''
        state.authenticated = false
        state.created_at = ''
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
