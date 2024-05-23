function listen() {
	if (document.readyState == 'complete') {
		// 资源加载完成

		// 拿到待删除节点:
    var self = document.getElementById('loading');
    if(!self){
      return false
    }

    // 拿到父节点:
    
    var parent =self&& self.parentElement;
    
		// 删除:
    var removed = parent.removeChild(self);
    let root =  document.getElementById("root")

    localStorage.setItem('dom',root.innerHTML);
	} else {
		// 资源加载中
   let dom =  localStorage.getItem('dom');
   if(!dom){
    let varcreateDiv = document.createElement('div');
    let loading = `<div class="loadingWrap"><div class="login">
      <div class="load">加载中 · · ·</div>
      <div class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div>
    </div></div>`;
    varcreateDiv.innerHTML = loading;
    varcreateDiv.classList.add('loading_w');
    varcreateDiv.id = 'loading';

    document.body.appendChild(varcreateDiv);
   }

		
	}
}
document.onreadystatechange = listen;
