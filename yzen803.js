let status_of_login = false;
let hereusername = null;
let herepassword = null;

function getv(){
    const dsa = document.querySelector('#vv');
    const zda = fetch('http://localhost:5000/api/GetVersion',{
        headers:{
            'Accept':"text/plain",
            'Content-type':'application/json',
        }
    });
    const zs = zda.then(s=>s.text());
    zs.then(s=>{
        dsa.innerHTML = s;
    });
}

function addsphoto(num){
    const stdiv = document.querySelector('#fistaff');
    const adiv = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('src','http://localhost:5000/api/GetStaffPhoto/'+num);
    img.style.height = "180px";
    img.style.width = '180px';
    img.style.display = "block";
    adiv.setAttribute('style','height:230px;width:185px');
    adiv.appendChild(img);
    adiv.style.float = "left";
    stdiv.appendChild(adiv);
}
function getinfo(num){
    const stdiv = document.querySelector('#fistaff');
    const bdiv = document.createElement('div');
    const name1a = document.createElement('a');
    const name1 = document.createElement('p');
    const tel = document.createElement('p');
    const em = document.createElement('p');
    const cate = document.createElement('p');
    const tela = document.createElement('a');
    const ema = document.createElement('a');

    const sta = fetch('http://localhost:5000/api/GetCard/'+num,{
        headers:{
            'Accept':"application/json",
            'Content-type':'application/json',
        }
    });

    const tt = sta.then(z=>z.text());
    tt.then(z=>{


        let a = z.split('\r\n');
        name1.innerHTML = a[3].slice(3);
        tel.innerHTML = a[7].slice(4);
        em.innerHTML = a[6].slice(16);
        cate.innerHTML = a[9].slice(11);
        name1a.appendChild(name1);
        name1a.setAttribute('href',a[8].slice(4));
        name1a.setAttribute('target','_blank');
        tela.appendChild(tel);

        tela.setAttribute('href','Tel:'+a[7].slice(4));
        ema.appendChild(em);
        ema.setAttribute('href','mailto:'+a[6].slice(16));
    });

    bdiv.appendChild(name1a);
    bdiv.appendChild(tela);
    bdiv.appendChild(ema);

    bdiv.appendChild(cate);
    bdiv.style.display = "inline-block";

    bdiv.style.width = '60%';
    bdiv.style.height = 'auto';
    bdiv.style.float='left';
    stdiv.appendChild(bdiv);
}

function getstaffdone(){
    const stdiv = document.querySelector('#fistaff');
    stdiv.style.width='auto';
    const aa = fetch('http://localhost:5000/api/GetAllStaff',{

        headers:{
            'Accept':"application/json",
            'Content-type':'application/json',
        }
    });
    aa.then(c=>c.json()).
    then(z => {

        for (let i = 0; i < z.length; i++) {
            addsphoto(z[i].id);
            getinfo(z[i].id);
            const line = document.createElement('hr');
            line.style.display='block';
            line.style.width='100%';
            stdiv.appendChild(line);
        }
    });

}

function getallstuff(){
    const a = fetch('http://localhost:5000/api/GetItems',{
        headers:{
            'Accept':"application/json",
            'Content-type':'application/json',
        }
    });
    const prodz = document.querySelector("#all");
    const j = a.then(res =>res.json());

      j.then(x=>{
        for(let i=0;i<x.length;i++){
            console.log(x[i]);
            addproduct(x[i]);
            adddescrip(x[i]);
            const hr=document.createElement('hr');
            prodz.appendChild(hr);
        }
    })
}
function purchasing(idnum){

    const aa = fetch('http://localhost:5000/api/PurchaseSingleItem/'+ idnum,{
        headers:{
            'Accept':"application/json",
            'Content-type':'application/json',
            'Authorization':'Basic '+ window.btoa(hereusername + ':'+ herepassword),
        }
    });
    console.log(aa);

    const zz = aa.then(c=>c.json());
    zz.then(c=>alert("Thank you for purchasing product: " + idnum +"!"));
}


function adddescrip(des){
    const prodz = document.querySelector("#all");
    const ndivs = document.createElement('div');
    const namep = document.createElement('p');
    namep.innerHTML = "Name: "+ des.name;
    namep.style.fontSize = "1vw";

    const desp = document.createElement('p');
    desp.innerHTML = "Description: "+ des.description;
    desp.style.fontSize = "1vw";
    const pricep = document.createElement('span');
    pricep.innerHTML = "Price: $" + des.price + " ";
    pricep.style.fontSize = "1vw";
    const idp = document.createElement('p');
    idp.innerHTML = "ID: " + des.id;
    idp.style.fontSize = "1vw";
    const bt = document.createElement('button');
    bt.style.background="Pink";
    bt.innerHTML = "BuyNow";
    bt.style.fontSize = "1vw";
    bt.setAttribute('display','inline-block');

    bt.onclick = function(){

        if (loginornot()){
            purchasing(des.id);




        }else {
            alert("Please Login before purchasing")
            const H = document.querySelector('#home1');
            const S = document.querySelector('#staff1');
            const I = document.querySelector('#shop1');
            const U = document.querySelector('#Register1');
            const G = document.querySelector('#Guest1');
            const Loin = document.querySelector('#Login1');
            H.style.display = "none";
            S.style.display = "none";
            I.style.display = "none";
            U.style.display = "none";
            G.style.display = "none";
            Loin.style.display = "block";
        }
    }











    /*ndivs.setAttribute('display','block');*/


    ndivs.appendChild(idp);
    ndivs.appendChild(namep);
    ndivs.appendChild(desp);
    ndivs.appendChild(pricep);

    ndivs.appendChild(bt);


    ndivs.style.width = '40%';
    ndivs.style.height = 'auto';
    ndivs.setAttribute('style','margin-left:100px');
    prodz.appendChild(ndivs);



}
function addproduct(prod){

    const prodz = document.querySelector("#all");
    const ndiv = document.createElement('div');
    const nimg = document.createElement('img');
    nimg.setAttribute('src','http://localhost:5000/api/GetItemPhoto/'+prod.id);
    nimg.setAttribute('style','width:8vw;height:8vw');
    nimg.style.maxWidth = '200px';
    nimg.style.maxHeight = '200px';
    nimg.style.minWidth = "90px";
    nimg.style.minHeight = "90px";

    ndiv.style.height = "auto";
    ndiv.style.width = "8vw";

    ndiv.setAttribute('class','product');
    ndiv.setAttribute('style','float:left');
    ndiv.setAttribute('display','inline-block');
    ndiv.appendChild(nimg);

    prodz.appendChild(ndiv);


}
function sLogout(){
    status_of_login = false;
    document.querySelector("#login").style.display="inline-block";
    document.querySelector("#logout").style.display="none";
    document.getElementById("login_name_out").innerHTML = "NotLogin";
    hereusername = null;
    herepassword = null;


}



function loginornot(){
    if(status_of_login){
        return true;
    }else{
        return false;
    }

}


function clearlogin(){
    document.getElementById("Luser").value="";
    document.getElementById("Lpassword").value="";
}

function sLogin(name,password){

    const lo = fetch('http://localhost:5000/api/GetversionA',{
        headers:{
            'Accept':"application/json",
            'Content-type':'application/json',
            'Authorization':'Basic '+ window.btoa(name+':'+password),
        }
    })
    const a = lo.then(z=>{if(z.status==200){
        status_of_login = true;
        alert("Login successful");
        hereusername = name;
        herepassword = password;

        const aa = a.then(z=>{document.getElementById("login_name_out").innerHTML = name}).then(e=>{clearlogin()});
        const loginbox = document.querySelector("#login");
        const logoutbox = document.querySelector("#logout");
        loginbox.style.display="none";
        logoutbox.style.display="inline-block";
        alert("inputbox will be reset.Re-directing to Home Page...\"");

        const H = document.querySelector('#home1');
        const S = document.querySelector('#staff1');
        const I = document.querySelector('#shop1');
        const U = document.querySelector('#Register1');
        const G = document.querySelector('#Guest1');
        const Loin = document.querySelector('#Login1');

        H.style.display = "block";
        S.style.display = "none";
        I.style.display = "none";
        U.style.display = "none";
        G.style.display = "none";
        Loin.style.display = "none";












          

        }else{

        alert("Password or Username wrong");
    }})






}

function clear_content()
{
    document.getElementById("Ruser").value="";
    document.getElementById("rpassword").value="";
    document.getElementById("raddress").value="";
}


function register(name,password,address){

    const re = fetch('http://localhost:5000/api/Register',{
        method:'POST',
        headers:{
            'Accept':"application/json",
            'Content-type':'application/json',
        },
        body:JSON.stringify({

            "UserName": name,
            "Password": password,
            "Address": address,


        })
    });
    const rerefresh = re.then(res =>
        res.text()
    );
    rerefresh.then(a=>{

        alert(a);
        alert("input box will be reset");
    }).then(z=>{clear_content()})

}

function writecommnets(com,comi){


    const wr = fetch('http://localhost:5000/api/WriteComment',{
        method:'POST',
        headers:{
            'Accept':"application/json",
            'Content-type':'application/json',
        },
        body:JSON.stringify({

            'Comment':com,
            'Name':comi,


        })
    });
     wr.then(v =>{document.getElementById('getcomments').setAttribute('src',  'http://localhost:5000/api/GetComments');
        alert("sucess!");
    })

}

window.onload = function(){
    getv();


    const h = document.querySelector('#home');
    const s = document.querySelector('#staff');
    const i = document.querySelector('#shop');
    const u = document.querySelector('#regis');
    const g = document.querySelector('#guest');
    const loinb = document.querySelector('#login');
    const looub = document.querySelector('#logout');


    const H = document.querySelector('#home1');
    const S = document.querySelector('#staff1');
    const I = document.querySelector('#shop1');
    const U = document.querySelector('#Register1');
    const G = document.querySelector('#Guest1');
    const Loin = document.querySelector('#Login1');
    const Lname = document.querySelector('#login_name_out');

    h.onclick = function (){
        H.style.display = "block";
        S.style.display = "none";
        I.style.display = "none";
        U.style.display = "none";
        G.style.display = "none";
        Loin.style.display = "none";
    }
    s.onclick = function (){
        H.style.display = "none";
        S.style.display = "block";
        I.style.display = "none";
        U.style.display = "none";
        G.style.display = "none";
        Loin.style.display = "none";
    }
    i.onclick = function (){
        H.style.display = "none";
        S.style.display = "none";
        I.style.display = "block";
        U.style.display = "none";
        G.style.display = "none";
        Loin.style.display = "none";
    }
    u.onclick = function (){
        H.style.display = "none";
        S.style.display = "none";
        I.style.display = "none";
        U.style.display = "block";
        G.style.display = "none";
        Loin.style.display = "none";
    }
    g.onclick = function (){
        H.style.display = "none";
        S.style.display = "none";
        I.style.display = "none";
        U.style.display = "none";
        G.style.display = "block";
        Loin.style.display = "none";
    }
    loinb.onclick = function(){
        H.style.display = "none";
        S.style.display = "none";
        I.style.display = "none";
        U.style.display = "none";
        G.style.display = "none";
        Loin.style.display = "block";
    }

    const com = document.querySelector('#Comments');
    const comi = document.querySelector('#comin');
    const comb = document.querySelector('#combut');

    comb.onclick = function(){
        if(com.value == ""){
            if(comi.value != ""){
                alert("please type in comment");
            }else{
                alert("please type in comment and name");
            }
        }else{
            if(comi.value ==""){
                alert("please type in name");
            }else{
                writecommnets(com.value,comi.value);

            }
        }

    }
    const rusername = document.getElementById('Ruser');
    const rpassword = document.getElementById('rpassword');
    const raddress = document.querySelector('#raddress');
    const renter = document.querySelector('#enter');


    renter.onclick = function (){
        if(rusername.value ==""||rpassword.value ==""){
            alert("please type in username and password");
        }else{

            register(rusername.value,rpassword.value,raddress.value);


        }

    }



    const lusername = document.getElementById('Luser');
    const lpassword = document.getElementById('Lpassword');
    const llogin = document.querySelector('#loginbt');

    llogin.onclick=function (){
        if(lusername.value==""){
            if (lpassword.value==""){
                alert("please type in your username and password");
            }else{
                alert("please type in your username");
            }
        }else {
            if(lpassword.value==""){
                alert("please type in your password");
            }else{

                sLogin(lusername.value,lpassword.value);



            }
        }
    }

    const llogout = document.querySelector('#logout');
    llogout.onclick = function(){
        sLogout();
    }

    getallstuff();

    const tdiv = document.querySelector('#all');
    const sb = document.querySelector('#find');
    sb.oninput = function(){
        if(this.value==""){
            tdiv.innerHTML ="";
            getallstuff();
        }else{
            tdiv.innerHTML="";
            searchbyname(this.value);

        }
    }
    function searchbyname(num){
        const aa = fetch('http://localhost:5000/api/GetItems/' + num,{
            method:"GET",
            headers:{
                'Accept':"application/json",
                'Content-type':'application/json',

            }
        });
        const prodz = document.querySelector("#all");
        const cc = aa.then(c=>c.json());
        cc.then(z=>{
            for(let i=0;i<z.length;i++){
                console.log(z[i]);
                addproduct(z[i]);
                adddescrip(z[i]);
                const hr=document.createElement('hr');
                prodz.appendChild(hr);}

        })
    }
    getstaffdone();












}