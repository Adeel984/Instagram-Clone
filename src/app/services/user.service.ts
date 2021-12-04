import { Injectable } from '@angular/core';
import { Config } from '../config/main.config';
import { EventsService } from './events.service';
import { NetworkService } from './network.service';
import { SqliteService } from './sqlite.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = Config.api + "/user";
  _user: any;
  avatar =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEUKME7///+El6bw8vQZPVlHZHpmfpHCy9Ojsbzg5ekpSmTR2N44V29XcYayvsd2i5yTpLFbvRYnAAAJcklEQVR4nO2d17arOgxFs+kkofz/154Qmg0uKsuQccddT/vhnOCJLclFMo+//4gedzcApf9B4srrusk+GsqPpj+ypq7zVE9LAdLWWVU+Hx69y2FMwAMGyfusLHwIpooyw9IAQfK+8naDp3OGHvZ0FMhrfPMgVnVjC2kABOQ1MLvi0DEIFj1ILu0LU2WjNRgtSF3pKb4qqtd9IHmjGlJHlc09IHlGcrQcPeUjTAySAGNSkQlRhCCJMGaUC0HSYUx6SmxFAtJDTdylsr4ApC1TY0yquKbCBkk7qnYVzPHFBHkBojhVJWviwgPJrsP4qBgTgbQXdsesjm4pDJDmIuswVZDdFx0ENTtkihoeqSDXD6tVxOFFBHndMKxWvUnzexpIcx/Gg2goJJDhVo6PCMGRAnKTmZuKm3wcJO/upphUqUHy29yVrRhJDORXOKIkEZDf4YiRhEF+iSNCEgb5KY4wSRDkB/yurUEG8nMcocgYABnvbrVL3nMIP0h/d5udKnwzSC/InfPdkJ6eWb0PJE++dyVVyQP5iQmWW27X5QG5druEKafBu0Hqu9saVOHa8HKC/K6BzHKZiRMEZCDF0Nd1/ZfXI/fcOibHOssFgokg9uFA20BhztHEAZIjIohrD/o1wljeFBDEwBo8YUt5Ir/rNLjOIACPFdy/AbEcPdcJBOCxytjeYAM4Kzp6rhOIPhRGNzwmFP3rOoTFI0irtnQKx6fj1Zt+h9njEUS9mKJxfFRrX5lt7wcQtaWTOfTHeIXVJQcQrRW+OYex2j0a66XZINoO8a7fPH2iHF2mC7ZBtB3Czb5QvjizSx7A3308mRzqAwujSywQbYfwc0iU8zqjS0yQ6ztEHX9332KCaGNIYB/Qq1z3yN0oDZBWyeFYJBCkm2sXLhDtpKFwNDMu5TnrZpYGiHbK4Nlwikg5DrYV1g6iPoJmzE5MKd/fOp53EPUaQZaLqH3u+vo2ELWp3wSyWuYGoj9EEIJoV3L9AUS/ZLsJpLNBXmqOu0CW6P5A/dx9IL0FAji/FYKot9EqE0Tvs6QBUe/2CxMEkZAlBNGPhdoAQWyTSmbxUwvUygwQyMmniAPgLt87CODXHuftWJIQgzrfQDC5AfwSgz9MmmG/gWCOqDgZ4JsQeTvZBoJJDhAFEsSDyxUEEUUekk0UEMhjBcEcGsoWVpBU3NcCgkkPkJWrKbdRZvULCMTWhYEdMrayBQRyqHcnSLmAIH7LcWJ8Hch7BsHEdWFpJsZjziCgFBpZ9TPm4e0XBJTTJKt9xjy8RoLI4gimPLP5goCSgWTrEcyzsy8IqmZVMo0H5bJiQToBCOjZ5RcElhjLN3dU7uQMAvoxwQkJZKI1CQzCthJYEigahHuDDi4rFwzCPQ7F1fiDQZgTR5iJwEGYRgIsiECD8BwwMAEfDcIaW8CRBQdhjS1kJQEchDEFhiRKr4KDFPS9FGQNVwEHoW83QjsEHdkfnuIOl6C1NjMItiaCaCWgbdpFJXQ9soh2uoB9aJcCxFdgZwlcrTmvENGlrITBBdpK25Qhd1F2RScq8CKu/gsCL8qN5THjy+Rr5E6joYgPxpdl518QrCf8Kpgjn6C8HLkbb+vt7ZM8wdVvy258khsRfHaS5DalDnlidZT7Erk+SXV5Bj1D3LS29XyhVJuoKHs9Q8S6reK11oUc7vPcr9uswP3SLiDINefXOF5rwCuGzVT6zVkVPfh2wWmHcz4wAwba2cgN1/Tsvleu7//i69CgVyt1GwjOs2+XK3rtbl151Tg3vOeioG40Mz2V+6pQ4xbJHOZj6g0EMxk93tV7fuedvVZpQSPhbwNBGInrymGrwNh1GXmL8F+lAaJ+NU/fzcmvJqvKj7177+1v1GY/GiBKI1Fdy/2XK6upXwaIJpI8B/399W0mH9zzafKaeCF9J0WF+jyCuFusTGzZKhFH8dVLZql2brxgcdVBKb7KG/7UZTmB3XJ6uL/QYT5ScRI74FcHEJ7feopyfGkaeaGlPoCw/BbjZmSBWIvINQNmTxdjWJqwUI8sztR4nYPuIPSTSUnOCZOE3ierqRoJfNSQxDjLEYs8i91eqgFCDSWiFHiuqAN9CwEGCPEISVjvwhS7Mfx6dtX8kC5aqvneGBOEFN2v6RBiYwr3DQOkLhEW6fHFbIwFQnkLiWYmZxE220z/aedPx99C+hiyKR4OzNFhg8S75CJTnxQ1dyugHTLaY10iu9dBpmhQtMz1ABLrkgtHVnRsPUO3OcU25i8cWdGxZbflCBKJqBdMs3aF/dYhNexU9RFcYEmLXYQKghyWdufyldBSU3KpjkKhZclxTXQGCTkL/HZDUIH5+Gkt4SgoCtj7pSYSNJLTK3VVRnmXZxebSMBIzmHABeIdXBebiN9eHYtUZ62ab3BdGkUm+SKJw1bdRXeewaX7qqdAnljg2sVxg3guAk3baofcg9yZ2eZpnHNvSFrEqhB9YPjesmt0pt6Xc8hl7W5L9Q4Xx09ctsrd5VhWeF6nF8SRrZdw49qns//0xTK/AZ8vGr3caTliuzeFNeCJTgafpKlhHd2WP1sy1LqDF798gjKJPLqDr9keoTd43+NyNzC1CI8Xy2lcPtOaVBI5IiAWyQ3e125AcKoXs2Djhy5eVc3KiBxREIPkhjBiLhIjU++4T91IbggjRiCJLSEIwWGddkEaxlVN5KCArPHk8mXVpHk8FHH7JL3n5dPA7C90q7XkeFJucacNmGXeRfswLE71HA79efaGiCN/Ofjmfmtcp8X10tIsqCacV5xfRWjNUiXGYbovWgyFYHcQLak15K9oM5zqmgaeKsHJetbSHfSPzXOiw/rxE9YH4CXaUpsZ0ztemFurP95Jpyvrd29YTpIZr7cEJHqfc7Wl0PFm2+yJR70udaokKFtGPTdm8WdQe24+HmVLlueboWQquBcYYVH2vEzfh8kCks1p90eWsLCyZ8qK7E86Oe+3XYFnBuiWdth20UqZR5SvMoyPg3WNauJipi0LMTQgVq5xUUlZcrPsopPHJ926z8pm7xyFLrH/PxpHSoXKdWgXsLn1scZn1ZDd/2vszN3lt254qkE+qu3yoqLM+ghN3Qz2qcVzUC/ZMFsK/alU6l0OWV/bQz6v6yYbyuN5BaZ4A7Y30vs/PPksS2+qzlvfF7OQmzzcL7W+xa7OIfRuVdtn/tdvdFLnL4OTKcm2W16PmWc4FWWXNSlWM2n3D+uPxuyrcfo74aP+Ac30a82+oLmfAAAAAElFTkSuQmCC";

  rolekeys = {
    super_admin: "Super Administrator / Owner",
    sub_admin: "Sub-Administrators (Community Admins)",
    employees: "Employees",
    family_head: "Head of the Family",
    family_member: "Family Member",
    guests_outsiders_one_time: "Guests / Outsiders One Time",
    guests_outsiders_daily: "Guests / Outsiders Daily"
  };

  constructor(
    public utility: UtilityService,
    public events: EventsService,
    public network: NetworkService,
    public sqlite: SqliteService,
  ) {

  }

  async login(formdata){
    
    return new Promise( async resolve => {

      let user = await this.sqlite.isUserExist(formdata.username, formdata.password) as any;
      if(user){

        console.log(user);
        const _user = await this.sqlite.setUserActiveById(user.id)

        resolve( _user );


      }else{
        resolve(null);
      }
      

    })

    

  }



  setUser(user) {
    this._user = user;
  }


  getCurrentUser() {
    return this._user;
  }

  update(data, token) {
    return {
      data: data,
      token: token
    };
  }

  switchUserAccount(sw_user_id){
    return new Promise( async resolve => {

      this.events.publish('stored:resetvariables')
      this.events.publish('user:get');
    })

  }

  public async getDatabseOfUser(){

    return new Promise( async resolve => {

      let key = await this.utility.getKey('db_set');
      if(key){

        let results = await this.sqlite.getAllUsers();
        resolve(results);
        return;
        
      }

      this.network.httpGetResponse('https://randomuser.me/api/?page=1&results=10&seed=feed').then( async response => {

        const _users = response['results'];
        var users = [];

        for (var i = 0; i < _users.length; i++) {

          var obj = {
            "id" : i,
            "gender" : _users[i]["gender"],
            "email" : _users[i]["email"],
            "title" : _users[i]["name"]["title"],
            "firstname" : _users[i]["name"]["first"],
            "lastname" : _users[i]["name"]["last"],
            "phoneNumber" : _users[i]["phone"],
            "picture" : _users[i]["picture"]["thumbnail"],
            "username" : _users[i]["login"]["username"],
            "password" : _users[i]["login"]["password"],
            "token": _users[i]["login"]["sha1"],
          };

          console.log(obj);


          // second flag is used to modify the resolve behaviour 
          await this.sqlite.setUserInDatabase(obj, true);
          users.push(obj);
        }

        this.network.httpGetResponse('https://jsonplaceholder.typicode.com/posts').then( async data => {
  
          
          let items = await this.utility.getKey('posts') as any[];
          
          console.log(data, items);

          // attach random users to each post 
          var full_plist = data.map((obj) => {
            // picka random user and attach 
            var user = users[Math.floor(Math.random() * users.length)];
            console.log(user);
            obj['userId'] = user.id
            return obj;
          });

          for(var i = 0; i < full_plist.length; i++){
            this.sqlite.setPostInDatabase(full_plist[i], true);
          }
          
          let results = await this.sqlite.getAllUsers();
          await this.utility.setKey('db_set', true);
          resolve(results);

        })

        // this.sqlite.setUserInDatabase()

        // 
        
      })
      


    })
  }


  isUserEmailPendingVerification(user){

    // fetch if any email verification is pending
    return new Promise( resolve => {
      this.network.checkIfDuplicateEmailVerificationPending(user.id, user).then( res => {
        // console.log(res);
        resolve(res['count']);
      })
    })

  }


  canUserBecomeResident(user) {
    var canResident = false;
    let roles = Object.keys(this.rolekeys);

    // console.log(user.roles);

    switch (user.roles[0].name) {
      case roles[0]: // super_admin
        break;
      case roles[1]: // sub_admin
        break;
      case roles[2]: // employees
        break;
      case roles[3]: // family_head
        canResident = true;
        break;
      case roles[4]: // family_member
        canResident = true;
        break;
      case roles[5]: // guests_outsiders_one_time
        break;
      case roles[6]: // guests_outsiders_daily
        canResident = true;
        break;
      default:
        break;
    }

    this._user['canBeResident'] = ( canResident && !!user.is_verified );
    return this._user['canBeResident'];
  }

  canSendPasses(user) {

    // console.log("P", user);
    if(!user){
      return false;
    }

    if(user.suspand == '1'){
      return false;
    }
    if(user.head_of_family == null){
      return false;
    }

    if(user.head_of_family != null){

      if( user.head_of_family == '1'){
        return true;
      }

      if( user.head_of_family == '0'){

        if(user.can_send_passes == null){
          return false;
        }

        if(user.can_send_passes != null){

          if( user.can_send_passes == '0'){
            return false
          }

          if( user.can_send_passes == '1'){
            return true;
          }

        }

      }

    }

    return false;
  }
}
