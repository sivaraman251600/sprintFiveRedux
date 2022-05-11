//import necessary node package
const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const rootReducer = redux.combineReducers
const middleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

// Action

const BUY_SWEET = 'BUY_SWEET'
const BUY_CHIPS = 'BUY_CHIPS'

function buySweet(){
    return{
        type:BUY_SWEET,
        payload:'Laddu'
    }
}

function buyChips(){
    return{
        type:BUY_CHIPS,
        payload:'Lays'
    }
}

// Reducer For Each One Separetly

const initialSweetState = {
    noOfSweet:10
}

const initialChipsState = {
    noOfChips:10
}

const sweetReducer = (state = initialSweetState,action) =>{
    switch(action.type){
        case BUY_SWEET : return {
            noOfSweet:state.noOfSweet - 1
        }

        default : return state
    } 
}

const chipsReducer = (state = initialChipsState,action) =>{   
    switch(action.type){
        case BUY_CHIPS : return {
            noOfChips:state.noOfChips - 1
        }

        default : return state
    }   
}

// create root reducer

const rootReducerOne = rootReducer({
    sweet:sweetReducer,
    chips:chipsReducer
})

// create store for holding the state as well as connect the reducer to the store

const store = createStore(rootReducerOne,middleware(logger))
console.log('Initial State', store.getState())
const unSubscribe = store.subscribe(()=>{})

store.dispatch(buySweet())
store.dispatch(buyChips())

unSubscribe();