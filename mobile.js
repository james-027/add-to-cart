
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref,push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
        databaseURL: "https://playground-a31d4-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,"ShoppingLists")
const shoppingListEL = document.getElementById("shopping-list")
const inputEL = document.getElementById("input-field")
const addbuttonEL = document.getElementById("add-button")






onValue(shoppingListInDB,function(snapshot){
      
      if (snapshot.exists()){

            let shoppingListsArray = Object.entries(snapshot.val())
      
            clearShoppingLists()

                  for (let i = 0; i < shoppingListsArray.length; i++)
                  {
                  let currentItem = shoppingListsArray[i]
                  appendItemList(currentItem)
                  }
      } 
      else{
            clearShoppingLists()
           
      }
     


})


      addbuttonEL.addEventListener("click",function(){

            let value= inputEL.value

            if (value === ""){
                  alert("Nay, Mag-type muna kayo sa Input Field")
                  
            }
            else{

                  push(shoppingListInDB,value)
                  clearInputField() 
            }
            
    
   
    })

 function clearInputField(){
        inputEL.value=""
 }


 function appendItemList(InputValue){
       let itemID = InputValue[0]
       let itemValue = InputValue[1]
       let newEL = document.createElement("li")
       newEL.textContent = itemValue
      

       newEL.addEventListener("click", function(){
            let ExactLocationDB = ref(database,`ShoppingLists/${itemID}`)
            remove(ExactLocationDB)
       })

     
     
       shoppingListEL.append(newEL)

 }



 function clearShoppingLists(){
        shoppingListEL.innerHTML = ""
 }

 