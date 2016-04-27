
chat.controller('chat',['$scope','$http','Chatsrv',function ($scope,$http,Chatsrv) {
  var jsons=[];
  // Chatsrv.getNearby2().then(function (response) {
  //   console.log(response);
  // });
  var date=new Date();
  var hash=[];
  var hashnow;
  // Chatsrv.movie().then(function (response) {
  //   console.log(response);
  //   alert(response.data.director.url);
  // },function (error) {
  //   console.log(error);
  // })
  $scope.items=[{
    class:'even',
    name:'robot',
    time:date.toLocaleString(),
    text:'你好',
    src:'images/robot.jpg'
  }];
  $scope.getSay=function () {
    console.log('getsaystart');
    //页面上显示我的新增信息
    $scope.items.unshift({
      class:'odd',
      name:'me',
      time: date.toLocaleString(),
      text:document.getElementById('say').value,
      src:'images/avatar.png'
    });
    //更新服务器数据
    Chatsrv.setChatInfo({
      class:'odd',
      name:'me',
      time: date.toLocaleString(),
      text:document.getElementById('say').value,
      src:'images/avatar.png'
    });
    //console.log($scope.items[lg]);
    //拿到我的输入
    var theInput=document.getElementById('say').value;
    var patt=new RegExp('听','g');
    var pattfj=new RegExp('上海的','g');
    var result;
    var resultgj;
    if((result=patt.exec(theInput))!=null){
      //发现’听‘关键字
      var patti=new RegExp('的','g');
      var resulti;
      var index=patt.lastIndex;

      if ((resulti=patti.exec(theInput))!=null) {
        //发现‘的’关键字
        var indexi=patti.lastIndex;
        var inputer=theInput.slice(index,indexi-1);
        var inputs=theInput.slice(indexi);
        console.log(inputer,'ff',inputs);
        for (var i = 0; i < hash.length; i++) {
          if (hash[i].songname==inputs&&hash[i].singername==inputer) {
            hashnow=hash[i].hash;
          }
        }
        Chatsrv.getUrl(hashnow).then(function (response) {
          $scope.showJson(response);
          console.log(response);
          document.getElementById('audio').style.display='block';
          document.getElementById('audio').src=response.data.data.url;
          $scope.items.unshift({
            class:'even',
            name:'robot',
            time: date.toLocaleString(),
            text:'好，马上为你播放',
            src:'images/robot.jpg'
          });
          Chatsrv.setChatInfo(
            {
              class:'even',
              name:'robot',
              time: date.toLocaleString(),
              text:'好，马上为你播放',
              src:'images/robot.jpg'
            }
          );
        },function (error) {
          alert('网络错误');
        });
      }else{
      //只有’听‘关键字

      console.log(result);;
      var newInput=theInput.slice(index);
      var info="我找到这些歌曲：";
      console.log(newInput,index);
      Chatsrv.getSongs(newInput).then(function (response) {
        $scope.showJson(response);
        console.log(response);
        for (var i = 0; i < response.data.data.data.length; i++) {
          info+=response.data.data.data[i].singername+"的"+response.data.data.data[i].songname+'、';
        }
        hash=response.data.data.data;
        //在页面显示机器人信息
        $scope.items.unshift({
          class:'even',
          name:'robot',
          time: date.toLocaleString(),
          text:info,
          src:'images/robot.jpg'
        });
        //同步数据到服务器
        Chatsrv.setChatInfo(
          {
            class:'even',
            name:'robot',
            time: date.toLocaleString(),
            text:info,
            src:'images/robot.jpg'
          }
        );
      },function (error) {
        alert('网络错误');
      });
    }

    }
    else if ((resultfj=pattfj.exec(theInput))!=null) {
      //发现附近关键字
      var indexfj=pattfj.lastIndex;
      var thequery=theInput.slice(indexfj);
      Chatsrv.getNearby2(thequery).then(function (response) {
        $scope.showJson(response);
        console.log(response);
        var newresult=response.data.PlaceSearchResponse.results.result;
        var newInfo="我为您搜索到的信息有:";
        for (var i = 0; i < newresult.length; i++) {
          newInfo+='位于'+newresult[i].address+'的'+newresult[i].name+'－－';
        };
        // newInfo+=newresult.addressComponent.city+newresult.addressComponent.country+newresult.addressComponent.district+newresult.addressComponent.provice+newresult.addressComponent.street;
        // newInfo+="商业信息:"+newresult.business;
        // newInfo+="描述:"+newresult.sematic_description;

        $scope.items.unshift({
          class:'even',
          name:'robot',
          time: date.toLocaleString(),
          text:newInfo,
          src:'images/robot.jpg'
        });
        Chatsrv.setChatInfo(
          {
            class:'even',
            name:'robot',
            time: date.toLocaleString(),
            text:newInfo,
            src:'images/robot.jpg'
          }
        );
      },function (error) {
        alert('网络错误');
      })
    }else{
      //未发现关键字，直接申请请求

    Chatsrv.getResponse(document.getElementById('say').value).then(function (response) {
      $scope.showJson(response);
      console.log('getResponse');
      $scope.items.unshift({
        class:'even',
        name:'robot',
        time: date.toLocaleString(),
        text:response.data.text,
        src:'images/robot.jpg'
      });
      Chatsrv.setChatInfo({
        class:'even',
        name:'robot',
        time: date.toLocaleString(),
        text:response.data.text,
        src:'images/robot.jpg'
      });
      //console.log($scope.items[lg]);
    },function (error) {
      alert('网络错误');
    });
  }
};
  $scope.getHistory=function () {
    var items=$scope.items;
    var itemsnow=Chatsrv.getChatInfo(items);
    $scope.items=itemsnow;
    $scope.showJson(items);
  }
  $scope.showJson=function (res) {
var str = JSON.stringify(res, undefined, 4);

output(syntaxHighlight(str));
  }
  function output(inp) {
  document.getElementById('showpre').innerHTML = inp;
}

  function syntaxHighlight(json) {
      json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          var cls = 'number';
          if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                  cls = 'key';
              } else {
                  cls = 'string';
              }
          } else if (/true|false/.test(match)) {
              cls = 'boolean';
          } else if (/null/.test(match)) {
              cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
      });
  }
}]);
