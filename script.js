var list=[
"Nashville, TN", 36.17, -86.78,
"Atlanta, GA", 33.75, -84.39,
"Denver, CO", 39.74, -104.98,
"Seattle, WA", 47.61, -122.33,
"Los Angeles, CA", 34.05, -118.24,
"Memphis, TN", 35.15, -90.05
          ];

function Map(list){
  // делим полный список по группам имен
    let cities = [];
    let split = 3;
    for(let i = 0, j = 0, length = list.length; i < length; i+=split, j++) {
      cities[j] = list.slice(i, i + split);};      

  /////№1 - найти самую северную, южную, западную и восточную точку////////
  
  this.getSide=function(side){  
    if(side==='south'){//сортируем по возрастанию широту, выводим первое значение
      var cityLad=cities.sort(function(a,b){    
        if (a[1]>b[1])
            {return 1;}
        else if(a[1]<b[1])
            {return -1;}
        else return 0;
      });
    }else if(side==='north'){ //сортируем по убыванию широту, выводим первое значение
      var cityLad=cities.sort(function(a,b){    
        if (a[1]>b[1])
            {return -1;}
        else if(a[1]<b[1])
            {return 1;}
        else return 0;
      });        
    }else if(side==='east'){ //сортируем по возрастанию долготу, выводим первое значение
      var cityLad=cities.sort(function(a,b){    
        if (a[2]>b[2])
            {return 1;}
        else if(a[2]<b[2])
            {return -1;}
        else return 0;
      });
    }else if(side==='west'){ //сортируем по убыванию долготу, выводим первое значение
      var cityLad=cities.sort(function(a,b){
        if (a[2]>b[2])
            {return -1;}
        else if(a[2]<b[2])
            {return 1;}
        else return 0;
      });
    };
    var CityName=cityLad[0].slice(0,1);
    return CityName;
  };
  


  /////////№2 - найти ближайший к координате город/////////////////

  this.getClose=function(){ 
    var inputLat=document.getElementById('lat').value;
    var inputLon=document.getElementById('lon').value;
    
    function distance(lat1, lon1, lat2, lon2) {//формула вычисления расстояния от координат а до b
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lon2 - lon1) * p))/2;
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
      };
    var distanceToCity=cities.map(function(city){//вычисление расстояния от каждого города до данных координат
       var latThis=city[1];
       var lonThis=city[2];   
       var dist=distance(latThis,lonThis,inputLat,inputLon); 
       if (city[3]){city.pop()};
       city.push(dist);
       return city;});

    var distSort=distanceToCity.sort(function(a,b){
       if(a[3]>b[3]){return 1;}
       else if(a[3]<b[3]){return -1;}
       else return 0;});

    return "Ближайший город - "+distSort[0].splice(0,1);
    };

  /////////3 вывести список аббревиатур//////////////////
  this.getAbbr=function(){// удаляем пробелы, запятые из массива
    var allAbbr=cities.map(function(city){
      var names=city.slice(0,1); //name of the city
      var abbrClean=names.map(function(name){
        return name.split(',').slice(1).join();        
      });
      return abbrClean.toString();      
    });
    allAbbr.sort();//сортируем по алфивиту
    var uniq=unique(allAbbr);//удаляем повторы
    
    function unique(arr) {
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true; // запомнить строку в виде свойства объекта
      }
     return Object.keys(obj); // или собрать ключи перебором для IE8-
    };
    
    return uniq.toString().replace(/,/g, " ");    
  };  
};
var map=new Map(list);
var N=map.getSide('north');
var S=map.getSide('south');
var E=map.getSide('east');
var W=map.getSide('west');