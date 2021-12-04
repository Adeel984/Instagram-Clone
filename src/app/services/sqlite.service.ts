import { Injectable } from '@angular/core';
import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { NetworkService } from './network.service';
import { UtilityService } from './utility.service';
import { browserDBInstance } from './browser-db-instance'
import { error } from 'protractor';
import { StorageService } from './basic/storage.service';

declare var window: any;
const SQL_DB_NAME = '__broswer.db';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  db: any;
  config: SQLiteDatabaseConfig = {
    name: 'zuul_systems.db',
    location: 'default'
  }
  
  public msg = "Sync In Progress ...";

  constructor(
    private storage: StorageService, 
    private platform: Platform, 
    private sqlite: SQLite, 
    ) {

      


  }

  public initialize() {

    return new Promise(resolve => {
      this.storage.get('is_database_initialized').then(async v => {
        if (!v) {
          await this.initializeDatabase();
          resolve(true);
        } else {
          resolve(true);
        }
      })
    })

  }

  async initializeDatabase() {

    return new Promise(async resolve => {
      await this.platform.ready();
      // initialize database object
      await this.createDatabase()
      
      // initialize all tables

      // initialize users table
      await this.initializeUsersTable();
      // initialize the user flags table for screens
      await this.initializePostsTable();
      // initialize users table
      
      this.storage.set('is_database_initialized', true);
      resolve(true);
    })


  }

  async createDatabase(){
    return new Promise<void>( async resolve => {
      if(this.platform.is('cordova')){
        await this.sqlite.create(this.config).then(db => {
          this.msg = 'Database initialized';
          this.db = db
        });
      }else{
        let _db = window.openDatabase(SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
        this.db = browserDBInstance(_db);
        this.msg = 'Database initialized';
        
      }
      resolve();
    })
    

  }

  async initializeUsersTable() {

    return new Promise(resolve => {
      // create statement
      var sql = "CREATE TABLE IF NOT EXISTS users(";
      sql += "id INTEGER PRIMARY KEY, ";
      sql += "gender TEXT, " 
      sql += "email TEXT, " 
      sql += "title TEXT, " 
      sql += "firstname TEXT, " 
      sql += "lastname TEXT, " 
      sql += "phoneNumber TEXT, " 
      sql += "username TEXT, "
      sql += "password TEXT, "
      sql += "picture TEXT, "
      sql += "token TEXT, " 
      sql += "active INTEGER DEFAULT 0 "; 
      sql += ")";

      this.msg = 'Initializing Users ...';
      resolve(this.execute(sql, []));
    })

  }

  async initializePostsTable() {

    return new Promise(resolve => {
      // create statement
      var sql = "CREATE TABLE IF NOT EXISTS posts(";
      sql += "id INTEGER PRIMARY KEY, ";
      sql += "userId INTEGER, ";
      sql += "title TEXT, ";
      sql += "body TEXT, ";
      sql += "UNIQUE(id, userId) ";
      sql += ")";

      this.msg = 'Initializing User Posts ...';
      resolve(this.execute(sql, []));
    })

  }

  public async setUserInDatabase(_user, multiple = false) {
    return new Promise(async resolve => {
      // check if user is already present in our local database, if not, create and fetch his data
      // check if user exist in database, if not create it else update it
      var sql = "INSERT OR REPLACE INTO users(";
      sql += "id, ";
      sql += "gender, " 
      sql += "email, " 
      sql += "title, " 
      sql += "firstname, " 
      sql += "lastname, " 
      sql += "phoneNumber, " 
      sql += "picture, " 
      sql += "username, "
      sql += "password, "
      sql += "token "
      sql += ") ";

      sql += "VALUES (";

      sql += "?, "
      sql += "?, " 
      sql += "?, " 
      sql += "?, " 
      sql += "?, " 
      sql += "?, " 
      sql += "?, " 
      sql += "?, " 
      sql += "?, " 
      sql += "?, " 
      sql += "? " // 10      
      sql += ")";

      var values = [
        _user.id,
        _user.gender,
        _user.email,
        _user.title,
        _user.firstname,
        _user.lastname,
        _user.phoneNumber,
        _user.picture,
        _user.username,
        _user.password,
        _user.token,
      ];

      await this.execute(sql, values);

      if (_user.token) {

        let sql3 = "UPDATE users SET active = ?";
        let values3 = [0];
        await this.execute(sql3, values3);


        if(!multiple){
          let sql2 = "UPDATE users SET active = ? where id = ?";
          let values2 = [_user.token, 1, _user.id];
          await this.execute(sql2, values2);
        }
        

      }

      if(!multiple){
        resolve(await this.getActiveUser());
      }else{
        resolve(true);
      }
      

    })
  }

  public async setPostInDatabase(_post, multiple = false) {
    return new Promise(async resolve => {
      // check if post is already present in our local database, if not, create and fetch his data
      // check if post exist in database, if not create it else update it
      var sql = "INSERT OR REPLACE INTO posts(";
      sql += "id, ";
      sql += "userId, ";
      sql += "title, ";
      sql += "body ";
      sql += ") ";

      sql += "VALUES (";

      sql += "?, "
      sql += "?, " 
      sql += "?, " 
      sql += "? " // 4      
      sql += ")";

      var values = [
        _post.id,
        _post.userId,
        _post.title,
        _post.body
      ];

      await this.execute(sql, values);

      if(!multiple){
        resolve(await this.getPostById(_post.id));
      }else{
        resolve(true);
      }
      

    })
  }

  public async getAllPosts(user_id = null){
    return new Promise(async resolve => {
      let sql = "SELECT * FROM posts ";
      let values = [];

      if(user_id){
        sql += "where userid = ?"
        values.push(user_id);  

      }

      let d = await this.execute(sql, values);
      if (!d) {
        resolve(null);
      }
      // var data = d as any[];
      const data = this.getRows(d);
      if (data.length > 0) {
        resolve(data);
      } else {
        resolve([]);
      }

    })
  }

  public async getPostById(id){
    return new Promise(async resolve => {
      let sql = "SELECT * FROM posts where id = ?";
      let values = [id];

      let d = await this.execute(sql, values);
      if (!d) {
        resolve(null);
      }
      // var data = d as any[];
      const data = this.getRows(d);
      if (data.length > 0) {
        let id = data[0];
        resolve(id);
      } else {
        resolve(null);
      }

    })
  }

  public async getCurrentUserAuthorizationToken() {
    return new Promise(async resolve => {
      let user_id = await this.getActiveUserId();
      let sql = "SELECT token FROM users where id = ? limit 1";
      let values = [user_id];

      let d = await this.execute(sql, values);
      // this.utility.presentToast(d);
      if (!d) {
        resolve(null);
        return;
      }
      // var data = d as any[];
      const data = this.getRows(d);
      if (data.length > 0) {
        resolve(data[0]['token']);
      } else {
        resolve(null);
      }

    })
  }

  public async getUserByUsername(username) {

    return new Promise(async resolve => {

      let sql = "SELECT * FROM users where username = ?";
      let values = [ username ];
      let d = await this.execute(sql, values);
      if (!d) {
        resolve(null);
      }
      // var data = d as any[];
      const data = this.getRows(d);
      if (data.length > 0) {
        let id = data[0];
        resolve(id);
      } else {
        resolve(null);
      }

    })

  }

  public async setUserActiveById(id) {

    return new Promise(async resolve => {

      let sql3 = "UPDATE users SET active = ?";
      let values3 = [0];
      await this.execute(sql3, values3);

      let sql2 = "UPDATE users SET active = ? where id = ?";
      let values2 = [ 1, id];
      await this.execute(sql2, values2);

      resolve(this.getUserById(id))

    })

  }

  public async getUserById(id) {

    return new Promise(async resolve => {
      let sql = "SELECT * FROM users where id = ?";
      let values = [id];

      let d = await this.execute(sql, values);
      if (!d) {
        resolve(null);
      }
      // var data = d as any[];
      const data = this.getRows(d);
      if (data.length > 0) {
        let id = data[0];
        resolve(id);
      } else {
        resolve(null);
      }

    })

  }

  public async getActiveUserId() {

    return new Promise(async resolve => {
      let sql = "SELECT id FROM users where active = ?";
      let values = [1];

      let d = await this.execute(sql, values);
      if (!d) {
        resolve(null);
      }
      // var data = d as any[];
      const data = this.getRows(d);
      if (data.length > 0) {
        let id = data[0]["id"];
        resolve(id);
      } else {
        resolve(null);
      }

    })

  }



  public async getActiveUser() {
    return new Promise(async resolve => {
      let sql = "SELECT * FROM users where active = ? ";
      let values = [1];

      let d = await this.execute(sql, values);
      // var data = d as any[];
      const data = this.getRows(d);
      if (data.length > 0) {
        var user = data[0];
        resolve(user);
      } else {
        resolve(null);
      }

    })
  }

  public async getAllUsers() {
    return new Promise(async resolve => {
      let sql = "SELECT * FROM users";
      let values = [];

      let d = await this.execute(sql, values);
      // var data = d as any[];
      const data = this.getRows(d);
      if (data.length > 0) {
        var users = data;
        resolve(users);
      } else {
        resolve([]);
      }

    })
  }

  isUserExist(username, password){

    return new Promise( async resolve => {

      let sql = "SELECT * FROM users where username = ? and password = ? ";
      let values = [username, password];

      let d = await this.execute(sql, values);
      // var data = d as any[];
      const data = this.getRows(d);
      if (data.length > 0) {
        var user = data[0];
        resolve(user);
      } else {
        resolve(null);
      }

    })

  }

  setLogout() {

    return new Promise(async resolve => {
      let user_id = await this.getActiveUserId();

      let sql = "UPDATE users SET token = ?, active = ? where id = ?";
      let values = [null, 0, user_id];

      let d = await this.execute(sql, values);
      // var data = d as any[];
      const data = this.getRows(d);
      if (data.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }


    })

  }

  execute(sql, params) {
    return new Promise(async resolve => {

      if (!this.db) {
        await this.platform.ready();
        // initialize database object
        await this.createDatabase()
      }

      console.log(sql);
      // if(this.platform.is('cordova')){
      console.log(params);
      this.db.executeSql(sql, params).then(response => {
        resolve(response);
      }).catch(err => {
        console.error(err);
        resolve(null);
      })

      
    })
  }


  private setValue(k, v) {
    return new Promise(resolve => {
      this.storage.set(k, v).then(() => {
        resolve({ k: v });
      });
    })

  }

  private getValue(k): Promise<any> {
    return new Promise(resolve => {
      this.storage.get(k).then(r => {
        resolve(r);
      });
    })

  }

  private getRows(data) {
    var items = []
    for (let i = 0; i < data.rows.length; i++) {
      let item = data.rows.item(i);

      items.push(item);
    }

    return items;
  }




}
