//多级菜单管理类

export function Menu(){
  this.tree ={
    id :  0,
    pid:  -1,
    sub:[],
    subShow:true,
    name:'我的菜单',
    style:{
      display:"block"
    }
  };

}

Menu.prototype.init = function (menu) {
  if(!menu.id){
    menu.id = this.count(this.tree);
  }

  if(!menu.style){
    menu.style ={};
  }

  if(!menu.link){
    menu.link = '#';
  }

  if(!menu.class){
    menu.class = 'active';
  }


  if(!menu.style){
    menu.style ={};
  }

  menu.subShow=false;
  if(menu.pid!=0){
    menu.style.display='none';
  }else{
    menu.style.display='block';
  }

  menu.sub = [];
}

Menu.prototype.count = function menuCount(tree){
  if(!tree.sub){
    return 1;
  }
  var sum = 1 ;
  for(var i=0;i<tree.sub.length;i++){
    sum+=this.count(tree.sub[i]);
  }

  return sum;
}

Menu.prototype.add = function(menu)
{
  this.init(menu);
  this.__add(this.tree,menu);
}

Menu.prototype.__add = function menuAdd(tree,menu){
  if(tree.id == menu.pid){
    if(!tree.sub){
      tree.sub =[];
    }

    return tree.sub.push(menu);
  }

  if(!tree.sub){
    return ;
  }

  for(var i=0;i<tree.sub.length;i++){
    this.__add(tree.sub[i],menu);
  }
}

Menu.prototype.addByArr = function menuAddByArr(arr){
  for(var i=0;i<arr.length;i++){
    this.init(arr[i]);
    this.__add(this.tree,arr[i]);
  }
}

Menu.prototype.search = function (name){
  this.__search(this.tree,name);
}

Menu.prototype.__search = function menuSearch(tree,key,value){
  if(tree[key] === value){
    return tree;
  }

  if(!tree.sub){
    return false;
  }

  var ret =false;

  for(var i=0;i<tree.sub.length;i++){
    ret = this.__search(tree.sub[i],key,value);
    if(ret){
      break;
    }
  }

  return ret;
}

Menu.prototype.addChildbyName = function menuAddChildbyName(name,menu){
  var parent = this.__search(this.tree,'name',name);
  if(parent){
    menu.pid = parent.id;
    this.init(menu);

    if(!parent.sub) parent.sub =[];
    parent.sub.push(menu);
  }
}

Menu.prototype.delChildbyName = function delChildbyName(name){

  var menu   = this.__search(this.tree,'name',name);
  if(menu==false) {
    console.log(`没有这个菜单 ${name}`);
    return ;
  }

  var parent = this.__search(this.tree,'id',menu.pid);

  var i,len = parent.sub.length;
  var sub  = [];

  for(i=0;i<len;i++){
    if(parent.sub[i].name != name){
      sub.push(parent.sub[i])
    }
  }

  parent.sub = sub
}



Menu.prototype.show = function (){
  this.__show(this.tree,'');
}

Menu.prototype.__show = function menushow(tree,space){
  if(tree){
    console.log(`${space}-->id:${tree.id},name:${tree.name},pid:${tree.pid} subShow:${tree.subShow} display ${tree.style.display}`);
  }
  if(!tree.sub)
    return;

  for(var i =0;i<tree.sub.length;i++){
    this.__show(tree.sub[i],space+'      |');
  }
}

Menu.prototype.getSubByName = function(name){
  return this.__search(this.tree,'name',name);
}

Menu.prototype.subChangeState = function(tree){

  tree.subShow = !tree.subShow;
  if(tree.sub){
    for(var i=0;i<tree.sub.length;i++){
      if(tree.subShow){
        tree.sub[i].style.display='block';
      }else{
        tree.sub[i].style.display='none';
      }
    }

    return true;
  }

  return false;
}

Menu.prototype.subChangeStateById = function(id){
  var tree = this.__search(this.tree,'id',id);

  this.subChangeState(tree);

}

Menu.prototype.get = function (){
  return this.tree.sub;
}