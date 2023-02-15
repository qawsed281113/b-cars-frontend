import axios from "axios";

export default class AuthService {
    USER_KEY = "user"
    user = null
    axios = null
    errors = []

    constructor(axios) {
        this.axios = axios
        this.user = null
        if (localStorage.getItem(this.USER_KEY) !== null) {
            this.setUser(JSON.parse(localStorage.getItem(this.USER_KEY)))
        }
    }

    isAuthorized() {
        return this.user !== null
    }

    logout() {
        this.user = null
        localStorage.removeItem(this.USER_KEY)
        delete axios.defaults.headers.common['Authorization']
    }

    setUser(user) {
        this.user = user
        localStorage.setItem(this.USER_KEY, JSON.stringify(user))
        let token = user.token
        axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
    }

    getUserName() {
        if (this.isAuthorized()) {
            return this.user.userName
        }
        return null
    }

    async register(login, password, phone) {
        this.errors = []
        try {
            let response = await axios.post("/api/auth/register", {
                userName: login,
                email: login,
                phone: phone,
                password: password
            })
            this.setUser(response.data)
        } catch (e) {
            this.errors = e.response.data.errors
        }
    }

    async login(login, password) {

        this.errors = []
        try {
            let response = await axios.post("/api/auth/login", {
                email: login,
                password: password
            })
            this.setUser(response.data)
            //console.log(response)
        } catch (e) {
            //console.log(e)
            this.errors = e.response.data.errors
        }

    }

    canEdit(car) {
        if (!this.isAuthorized()) {
            return false
        }
        return car.user.id === this.user.id
    }
}
