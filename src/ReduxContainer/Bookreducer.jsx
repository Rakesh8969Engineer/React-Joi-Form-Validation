import { buy_book } from "./BookTypes"
const initialstate={

numberofbooks:10


}

const bookreducer=(state=initialstate,action)=>{


switch(action.type){
case buy_book:return {

...state,numberofbooks:state.numberofbooks-1

}
default: return state
}


}

export default bookreducer;

