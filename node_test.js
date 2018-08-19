//vars
		let _domain = {id: "output_domain", value: "default domain"};
		let _ping = {id: "output_ping", value: "default ping"};
		//proxies
		const domain = new Proxy(_domain, {set: (t,p,v)=>{ t[p] = v; render(_domain); return true;} })
		const ping = new Proxy(_ping, {set: (t,p,v)=>{ t[p] = v; render(_ping); return true;} });

		const brutForce = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz0123456789-_/".split("");

		const cell = function(raLink, id){
			let valueId = 0;
			let valueKey = "";

			const resolve = function(){
				valueKey = brutForce[valueId];
			}

			this.next = function(){
				return new Promise((ok, notok)=>{
					if(valueId < brutForce.length-1){
						valueId++;
						resolve();
						ok();
					}else{
						valueId = 0;
						if(id+1 === raLink.length)
							raLink.push(new cell(raLink,id+1));
						raLink[id+1]
							.next()
							.then(ok);
					}
				})
			}
			this.getKey = function(){
				return valueKey;
			}
			this.getId = function(){
				return valueId;
			}
		}
		const plant = function(){
			let str = [];
			str.push(new cell(str,0));

			const build = function(){
				return new Promise((ok,notok)=>{
					ok(str.map((x)=>x.getKey()));
				});
			}

			this.next = function(){
				return new Promise((ok,notok)=>{
					str[0]
						.next()
						.then(build)
						.then(ok);
				})
			}

			this.get = function(){
				return str.map((x)=>x.getKey()).join("");
			}

			this.forEach = function(counter, callback){
				
			}
		}
		const jaba = new plant();
		jaba.next().then(x=>console.log(x));

		for(let i = 0; i < 9900000; i++){
			jaba.next();
			console.log(jaba.get());
		}

		function render(el){
			document.getElementById(el.id).innerHTML = el.value;
		}

		function pingPlotter(){
			const time = ()=> new Date().getTime();
			let start = time();
			let finish;
			let estimate;

			this.start = function(){
				start = time();
			}
			this.finish = function(){
				finish = time();
				estimate = finish - start;
				return this;
			}
			this.getResult = function (){
				return estimate;
			}
		}

		function mesurePing(url){
			return new Promise((ok,notok)=>{
				const plotter = new pingPlotter();
				request(url, (code)=>{
					console.log(code);
					ping = plotter.finish().getResult();
					ok();
				});
			})
		}
		function start(input){
			domain.value = input;
			mesurePing(domain.value);
		}
		function request(theUrl, callback, timeout){
		    var xmlHttp = new XMLHttpRequest();
		    xmlHttp.timeout = timeout || xmlHttp.timeout;

		    xmlHttp.onreadystatechange = function() { 
		    	if(callback)
	            	callback(xmlHttp.status);
		    }

		    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
		    xmlHttp.send(null);
		}
		function seekForInfinity(){
			for(let i = 0; ;i++){
				request("http://ums.corbina.net/sup/ums_dashboard.php");
			}
		}
		function seek(URL, timeout){
			let total = [];
			brutForce.forEach((x,i)=>{

			})
		}