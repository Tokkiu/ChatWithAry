chat.service('Chatsrv',['$http',function ($http) {
  //请求机器人的回应
  this.getResponse=function (thetext) {
    return $http({
      method:'GET',
      url:'http://apis.baidu.com/turing/turing/turing',
      headers:{
        'apikey':'5ec29ed3171f392052f042a8fd5b1f45',
        'Content-Type':'application/x-www-form-urlencoded charset=utf-8'

      },
      params:{
        key:'879a6cb3afb84dbf4fc84a1df2ab7319',
        info:thetext,
        userid:'eb2edb736'
      }
    });
  };
  //请求歌曲列表及歌曲信息
  this.getSongs=function (thename) {
    return $http({
      method:'GET',
      url:'http://apis.baidu.com/geekery/music/query',
      headers:{
        'apikey':'5ec29ed3171f392052f042a8fd5b1f45',
        'Content-Type':'application/x-www-form-urlencoded charset=utf-8'

      },
      params:{
        s:thename,
        //name:thename,
        size:'10',
        page:'1'
      }
    })
  };
  //根据歌曲的url播放
  this.getUrl=function (keyword) {
    return $http({
      method:'GET',
      url:'http://apis.baidu.com/geekery/music/playinfo',
      headers:{
        'apikey':'5ec29ed3171f392052f042a8fd5b1f45',
        'Content-Type':'application/x-www-form-urlencoded charset=utf-8'

      },
      params:{
        hash:keyword,
      }
    });
  }
  //上传数据到云端
  this.setChatInfo=function (theinfo) {

    infoSet.push(theinfo);
  };
  //从云端得到数据
  this.getChatInfo=function (items) {
    items=[];
    infoSet.orderByKey().on('child_added',function (snapShot) {

      console.log(snapShot.val());
      items.unshift(snapShot.val());
    })
    return items;
  };
  //附近的信息
  this.getNearby2=function (query) {
    return $http.get('http://localhost:3000/xmlparser',{
      params:{
        que:query,
        reg:'上海市'
      }
    });
  };
  this.movie=function () {
    return $http({
      method:'POST',
      url:'http://apis.baidu.com/baidu_openkg/shipin_kg/shipin_kg',
      data:"query=虎妈猫爸的最新剧集&resource=video_haiou",
      // {
      //   "query":"虎妈猫爸的最新剧集",
      //   "resource": "video_haiou"
      // },
      headers:{
        'apikey':'5ec29ed3171f392052f042a8fd5b1f45',
        'Content-Type':'application/x-www-form-urlencoded charset=utf-8'

      },
    });
    //return $http.post()
  };
}])
