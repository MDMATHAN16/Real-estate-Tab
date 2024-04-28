  const propname = document.querySelector("#propertyName");
  const amt = document.querySelector("#amount");
  const loc = document.querySelector("#Location");
  const btn = document.querySelector("#saveProperty");
  const cntbtn = document.querySelector("#connect");
  const dataret = document.querySelector("#addprop");
  let web3;
  let contract;
  let accountName;
  
  if(web3===undefined)
  {
    connect_meta();
  }
  cntbtn.addEventListener("click", async () => {
    connect_meta();
  });
  async function buyProperty(val){
    if(web3===undefined)
  {
    connect_meta();
  }
    const pId=parseInt(val);
    console.log(pId)
    await contract.methods.buyProperty(pId,true).send({ from: ethereum.selectedAddress })
    .then((t)=>{
      console.log(t);
    })
    .catch((e)=>{
      console.log(e)
    });
    const res = document.getElementById("content");
    res.innerHTML="";
    getPropertyDetails();
}
async function verify(id)
{
  if(web3===undefined)
    connect_meta();
  const res = await contract.methods.fetchprop(id).call();
  let t = res['owner'];
  const res2 = await contract.methods.fetchuser(t).call();
  console.log(res,res2);
  document.getElementById('v-property').style.display='block';
  document.getElementById('ping').src="img"+(parseInt(id)+1)+".jpg";
  document.getElementById('ownname').innerHTML = "Owner Name : "+res2['name'];
  document.getElementById('ownadd').innerHTML = "Address : "+res2['myaddress'];
  document.getElementById('ownbal').innerHTML= "Balance : "+res2['balance'];
  document.getElementById('ownppy').innerHTML= "No of Properties Owned : "+res2['Property_count'];
  document.getElementById('pname').innerHTML = "Property Name : "+res['Property_name'];
  document.getElementById('ploc').innerHTML = "Location : "+res['location'];
  document.getElementById('pprice').innerHTML = "Price : $"+res['price'];
  document.getElementById('pdes').innerHTML = "Description : "+res['description'];
}
  async function getPropertyDetails(){
    
    if(web3===undefined)
  {
    connect_meta();
  }
    try{
      let c1=0,c2=0;
        const res2 = document.getElementById("content");
        res2.innerHTML=" ";
        const res1 = document.getElementById("own");
        res1.innerHTML=" ";
        const res=await contract.methods.fetchData().call();
        let l = res.length;
        for(let i=0;i<l;i++)
        {
         // console.log(ethereum.selectedAddress,res[i]['owner'].toLowerCase());
            console.log('name: ',res[i]['Property_name'],' id : ',res[i]['id'],' location : ' ,res[i]['location'],' price : ',res[i]['price'],' owner : ',res[i]['owner']);
             if(res[i]['owner'].toLowerCase()!=ethereum.selectedAddress){
                c1++;
               create(res[i]['price'],res[i]['Property_name'],res[i]['location'],res[i]['id'],res[i]['description']);}
             else{
             createown(res[i]['price'],res[i]['Property_name'],res[i]['location'],res[i]['id'],res[i]['description']);
             c2++;}
        }
		//console.log(c1,c2);
        if(c2==0)
          res1.innerHTML="<h2> No Owned Properties</h2>";
        if(c1==0)
          res2.innerHTML="<h2> No Available Properties</h2>";
    }
    catch(err){
        console.log(err);
}
}
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
async function connect_meta()
{
  if (window.ethereum) {
    // Check for Metamask
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      cntbtn.style.color="green";
      connect.disabled = true;
      //accountName = prompt("Please enter a name for your Account:");
      //console.log("Account name:", accountName);

      // Create a contract instance using the ABI and contract address
     // 0x57Ec26379a85A863C62C9a3d21B0AF8c787cFEc0
      const contractAddress = "0xa093f67D9750b03C82663B2015d4CB10b03586Da"; // Replace with the actual address 0x936a0788d061a001Ba4Ee975207C89644429F740
   //  const contractAddress =0xdbB4E73d728aCE14a00Cb1A10AFa50935F69a376;
     const ABI = [
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					}
				],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "newOwner",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "bool",
						"name": "issale",
						"type": "bool"
					}
				],
				"name": "PropertyBought",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "Property_name",
						"type": "string"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "string",
						"name": "location",
						"type": "string"
					}
				],
				"name": "PropertyRegistered",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "Owners",
				"outputs": [
					{
						"internalType": "bool",
						"name": "isgovt",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "myaddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "Property_count",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "_propertyId",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "val",
						"type": "bool"
					}
				],
				"name": "buyProperty",
				"outputs": [],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "fetchData",
				"outputs": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "Property_name",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "description",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "location",
								"type": "string"
							},
							{
								"internalType": "bool",
								"name": "issale",
								"type": "bool"
							}
						],
						"internalType": "struct RealEstate.Property[]",
						"name": "",
						"type": "tuple[]"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "fetchprop",
				"outputs": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "id",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "Property_name",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "price",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "description",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "owner",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "location",
								"type": "string"
							},
							{
								"internalType": "bool",
								"name": "issale",
								"type": "bool"
							}
						],
						"internalType": "struct RealEstate.Property",
						"name": "",
						"type": "tuple"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "add",
						"type": "address"
					}
				],
				"name": "fetchuser",
				"outputs": [
					{
						"components": [
							{
								"internalType": "bool",
								"name": "isgovt",
								"type": "bool"
							},
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "myaddress",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "Property_count",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "balance",
								"type": "uint256"
							}
						],
						"internalType": "struct RealEstate.Owner",
						"name": "",
						"type": "tuple"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_address",
						"type": "address"
					}
				],
				"name": "isRegistered",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"name": "properties",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Property_name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "issale",
						"type": "bool"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "Property_name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_location",
						"type": "string"
					}
				],
				"name": "registerProperty",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "_name",
						"type": "string"
					}
				],
				"name": "registerUser",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					}
				],
				"name": "verify",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
		];
      contract = new web3.eth.Contract(ABI, contractAddress);
      const res = await contract.methods.isRegistered(ethereum.selectedAddress).call();
      if(!res)
      {
        accountName = prompt(" Welcome to Our Website Please enter a name for your Account:");
        await contract.methods.registerUser(accountName).send({from : ethereum.selectedAddress}).then((t)=>{
          console.log(t);
        }).catch( (e)=>{
          console.log(e);
        });
      }
      if('0xF133B22162c65a03E8590E8f2121aaa2D83E0110'.toLowerCase() === String(ethereum.selectedAddress))
      {
        document.getElementById("addpo").style.display = "block";
      }
      getPropertyDetails();
     
    } catch (error) {
      console.error(error);
      alert("Error connecting to Metamask!");
    }
  } else {
    alert("Please install Metamask!");
  }
}

async function addprop(){
    let pname = document.getElementById("name").value;
    let ploc = document.getElementById("loc").value;
    let pprice= document.getElementById("price").value;
    let pdes = document.getElementById("des").value;
    //registerProperty(string memory Property_name, uint _price,string memory description, string memory _location)
    await contract.methods.registerProperty(pname,pprice,pdes,ploc).send({ from: ethereum.selectedAddress }).then((t)=>{
      console.log(t);
      getPropertyDetails();
      closeForm();
    }).catch((e)=>{
      alert('error while insert');
    });
}
const closemodal1 = () => {
  document.getElementById('v-property').style.display='none';
}




