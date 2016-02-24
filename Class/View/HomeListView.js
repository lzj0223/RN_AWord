//主页
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ListView,
  Text,
  View,
  Image,
  TouchableOpacity,
  AlertIOS,
  RefreshControl,
  ActivityIndicatorIOS
} from 'react-native';


import MyListView from './MyListView'
var isPromise = require('is-promise')
var REQUEST_URL = 'http://127.0.0.1:3000/users/list';
var page = 1;
var dataSource = [];
export default class RandListView extends Component{

	//初始化。
    constructor(props) {
    	super(props);
   	 	this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
      };
  	}

  componentDidMount(){
  	this.props.navComponent.setNavItems({
      title: {
        component: (
          <Text style={styles.title}>
          首页
          </Text>
        ),
      event: function() {
        }.bind(this)
      }
    })
  }

  onRefresh(){
    this.myfetchData();
  }
//数据查询.
  fetchData(){

    var url = REQUEST_URL + '?page=' + page;
    return new Promise((resolve, reject)=>{
      fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          reject(error);
        })
        .then((responseData) => {

          if(responseData){
            var movieArr = dataSource;
            for (var i in responseData.datas) {
              movieArr.push(responseData.datas[i]);
            };
            if(page === 1){
              dataSource = responseData.datas;
            }
              this.setState({
              dataSource: this.state.dataSource.cloneWithRows(dataSource),
            });
              resolve(responseData.datas);
          }else{
            reject('none');
          }
          
        })
        .done();
    })
      
  }
 loadMore(){
 	page++;
    return this.fetchData();
 }
 refreshData(){
 	page = 1;
 }
 render(){
    return (
      <MyListView
        dataSource={this.state.dataSource}
        refreshTitle={'刷新'}
        {...this.props}
        fetchData={this.fetchData.bind(this)}
        loadMore={this.loadMore.bind(this)}
       	refreshData={this.refreshData.bind(this)}/>
    );
  }
 
}

const styles = StyleSheet.create({
   container: {
    flex:2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'White',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
    marginTop: 10,
    marginLeft: 4,
    marginRight: 4,
    textAlign: 'left',
  },
  year: {
    textAlign: 'center',
  },
  rightContainer: {
    flex: 1,
  },
  topContainer:{
    flex:1,
    height : 30,
    backgroundColor: 'LightGray',
  },
   thumbnail: {
    width: 400,
    height: 200,
  },
    listView: {
    paddingTop: 0,
    marginBottom: 44,
    backgroundColor: 'LightGray',
  },
    navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // top{
  //   height:60,
  //   flex: 1,
  // },
});

module.exports = RandListView;