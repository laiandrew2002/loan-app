

export default function init_backend() {
  let users = JSON.parse(localStorage.getItem('users'))
  let lapplications = JSON.parse(localStorage.getItem('lapplications'))
  if(users == null){
    users = []
  }
  if(lapplications == null){
    lapplications = []
  }

  let defaultFetch = window.fetch
  window.fetch = (url, options) => {
    //handle sign in
    if(url === '/signin'){
      return new Promise((resolve, reject) => {
        // console.log('+++++++++++++++++++++')
        // console.log("URL: " + url)
        // console.log("options: " + JSON.stringify(options))
        // console.log('+++++++++++++++++++++')
        
        const submitdata = JSON.parse(options.body)
        let response = null
        // find the user using the email from the list of users
        // then check if the password  == user.password
        console.log(submitdata)
        users.forEach((user)=>{
            console.log(user.email)
            console.log(submitdata.email)
            
            console.log(user.password)
            console.log(submitdata.password)
           if(submitdata.email === user.email &&
            submitdata.password === user.password){
              response = {
                id:user.id,
                email:user.email,
                source:user.source,
                lookingFor:user.lookingFor,
                applicationForm:user.applicationForm
              }
              resolve({
                ok: true,
                json: () => Promise.resolve(JSON.stringify(response))
              })
            }
        })
        if(!response){
          //Handling error
          let response = {
            message: "Username and Password does not match!"
          }
          throw   {
            ok:false,
            text: () => Promise.resolve(JSON.stringify(response))
          }
        }
        
        
      })
    }else if(url === '/register'){
      return new Promise((resolve, reject) => {
        // console.log('+++++++++++++++++++++')
        // console.log("URL: " + url)
        // console.log("options: " + JSON.stringify(options))
        // console.log('+++++++++++++++++++++')
        

        //Check for password and email
        const {email, password, name, source, lookingFor, applicationForm} = JSON.parse(options.body)

        console.log(email)
        console.log(password)
        console.log(name)
        console.log(source)
        console.log(lookingFor)
        console.log(applicationForm)
                //Check if the email exists
        //Check if the same password exists
        if(
             email
          && password
          && name
          && source
          && lookingFor
          && String(applicationForm)
          ){
            // Handling success
            let user = {
                id: users.length,
                email,
                password,
                name,
                source,
                lookingFor,
                applicationForm
            }

            users.push(user)
            localStorage.setItem('users', JSON.stringify(users))
            resolve({
              ok: true,
              json: () => Promise.resolve(JSON.stringify(user))
            })
          }else{
            //Handling error
            let response = {
              message: "please make sure you submit all the required parameters"
            }
            throw   {
              ok:false,
              text: () => Promise.resolve(JSON.stringify(response))
            }
          }
        

      })
    }else if(url === '/apply'){
      return new Promise((resolve, reject) => {
        console.log('+++++++++++++++++++++')
        console.log("URL: " + url)
        console.log("options: " + JSON.stringify(options))
        console.log(JSON.parse(options.body))
        console.log('+++++++++++++++++++++')
        const {loan, month, user} = JSON.parse(options.body)
        
        console.log(loan )
        console.log(month )
        console.log(user)
        let newuser = users[user.id]
        newuser.applicationForm=true;
        users[user.id]=newuser;
        let lapplication = {
          loan,
          month,
          newuser,
        }
        lapplications.push(lapplication)
        localStorage.setItem('lapplications', JSON.stringify(lapplications))
        localStorage.setItem('users', JSON.stringify(users))
        resolve({
          ok: true,
          json: () => Promise.resolve(JSON.stringify(lapplication))
        })
      })
    }else if(url === '/weekly'){
      return new Promise((resolve, reject) => {
        console.log('+++++++++++++++++++++')
        console.log("URL: " + url)
        console.log("options: " + JSON.stringify(options))
        console.log('+++++++++++++++++++++')
        let response = null
        //GET
        if(options.method === 'get'){
          //extract the user
          const {user} = JSON.parse(options.body)
          console.log('user in backend',user)
          //extract the lapplication for the user
          lapplications.forEach((lapplication)=>{
            console.log('lapplication',lapplication)
            if(lapplication.newuser.id == user.id){
              response=lapplication
              console.log('mlm',response)
              resolve({
                ok: true,
                json: () => Promise.resolve(JSON.stringify(response))
              })
            }
          })
          if(!response){
            //Handling error
            let response = {
              message: "Username and Password does not match!"
            }
            throw   {
              ok:false,
              text: () => Promise.resolve(JSON.stringify(response))
            }
          }
          
        
        }else if(options.method === 'post'){

          //POST
          const {user, currentLoan} = JSON.parse(options.body)
          console.log('user', user)
          console.log('options', options.body)
          lapplications.forEach((lapplication)=>{
            console.log('lapplication',lapplication)
            if(lapplication.newuser.id == user.id){
                lapplication.currentLoan=currentLoan
              response=lapplication
              console.log(response)
              resolve({
                ok: true,
                json: () => Promise.resolve(JSON.stringify(response))
              })
            }
          })
        }
      })

      
    }else{
      //default fetch
      return defaultFetch(url, options)
    }
  }
}

 
