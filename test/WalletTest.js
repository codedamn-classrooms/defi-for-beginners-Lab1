// //const { assert } = require("console");

// const Wallet=artifacts.require('Wallet');


// contract('Wallet',(accounts) => {

//     it('Should deploy smart contract properly',async () => {
//          const demo=await Wallet.deployed();
//          assert(demo.address !== '');
//          // const manager_add= await demo.owner();
//          // const deployer_add=accounts[0];
//          // assert.equal(manager_add,deployer_add,"manager is not deployer");
         
// });

//     it('should set accounts[0] as owner',async()=>{
//       const demo=await Wallet.deployed();
//       const owner = await demo.owner(); 
//       assert(owner == accounts[0]);
//     })

//     it('deposit ether to wallet',async() => {
//       const demo=await Wallet.deployed();
//       await demo.deposit({from:accounts[0],value:100});
//       const balance=await web3.eth.getBalance(demo.address);
//       console.log(Number(balance))
//       assert(parseInt(balance)===100);
//     });
   
//      it('Should return balance of the owner', async () =>{
//         const demo=await Wallet.deployed();
//          const balance=await demo.balanceOf();
//          //const ownerBal=await demo.balanceOf();
//         console.log(Number(balance))
//         assert(parseInt(balance)===100);
        

//      });

//      it('should transfer ether to another address', async() => {
//       const demo=await Wallet.deployed();
   
//         const receiver_beforeBalance= await web3.eth.getBalance(accounts[1]);
//         //console.log(receiver_beforeBalance);
//         await demo.send(accounts[1], web3.utils.toWei('1', 'ether'));
        
//         const receiver_afterBalance= await web3.eth.getBalance(accounts[1]);
//         //console.log(receiver_afterBalance);
//         const finalBalance=web3.utils.toBN(receiver_afterBalance);
//         const initialBalance= web3.utils.toBN(receiver_beforeBalance);

//       const temp = finalBalance.sub(initialBalance)
//       console.log(Number(temp))
//         assert(Number(temp)===1000000000000000000, "not transferred");
         
       
        
//       });

//      it("amount send should be atleast 1 ether",async () => {
//       try{
//          const demo=await Wallet.deployed();
//          const value=await demo.send(accounts[1], web3.utils.toWei('1', 'ether'),{ value: web3.utils.toWei('1', 'ether')});
//          const val = (web3.utils.fromWei(value.receipt.logs[0].args.amount, 'ether'));
//          console.log(val);
//         // assert.isAtLeast(Number(val),1,"less than 1 ether");
//         }
//         catch(e){
//          assert(true,"amount not send");
//         }
//      });

//      it('checks if only owner can send', async () => {
//       let isOwner=false;
//       try {
         
//          const demo=await Wallet.deployed();
//          await demo.send(accounts[1],10,{from:accounts[0]});
//          console.log('done');
//          isOwner=true;
//          console.log("is owner");
//          assert.equal(isOwner,true);
          
          
//       } catch (error) {
//          console.log("Not owner");
//           //assert(false,"Only owner should send the tx");
//           assert.equal(isOwner,false);
//       }
      
//    });

    
// });
    






const Wallet = artifacts.require('Wallet');
const truffleAssert = require('truffle-assertions');


contract('Wallet', (accounts) => {

   it('Should deploy smart contract properly', async () => {
      const demo = await Wallet.deployed();
      assert(demo.address !== '');
      const manager_add = await demo.owner();
      const deployer_add = accounts[0];
      assert.equal(manager_add, deployer_add, "manager is not deployer");

   });

   it('should set accounts[0] as owner', async () => {
      const demo = await Wallet.deployed();
      const owner = await demo.owner();
      assert(owner == accounts[0]);
   })

   it('deposit ether to wallet', async () => {
      const demo = await Wallet.deployed();
      await demo.deposit({ from: accounts[0], value: web3.utils.toBN(7000000000000000000) })
      const bal = await web3.eth.getBalance(demo.address);
      console.log(Number(bal));
      assert(Number(bal) === 7000000000000000000);
   })

   it('Should return balance of the owner', async () => {
      const demo = await Wallet.deployed();
      const manager_add = await demo.owner();

      const ownerBal = await demo.balanceOf();

      assert.isNotNull(ownerBal, "wrong balance");
   });

   it('should transfer ether to another address', async () => {
      const demo = await Wallet.deployed();

      const receiver_beforeBalance = await web3.eth.getBalance(accounts[1]);
      await demo.send(accounts[1], web3.utils.toWei('1', 'ether'), { value: web3.utils.toWei('1', 'ether') });

      const receiver_afterBalance = await web3.eth.getBalance(accounts[1]);
      const finalBalance = web3.utils.toBN(receiver_afterBalance);
      const initialBalance = web3.utils.toBN(receiver_beforeBalance);

      const temp = finalBalance.sub(initialBalance)
      assert(Number(temp) === 1000000000000000000, "not transferred");
   });

   it("Sending amount less than 1eth should fail", async () => {
      // check if send function is working for normal case
      const demo = await Wallet.deployed();
      await truffleAssert.passes(
         demo.send(accounts[1], web3.utils.toWei('2', 'ether')),
         'Send function should be implemented correctly.'
      )
      // now check if it has require statement for amount less than 1 ether
      await truffleAssert.reverts(
         demo.send(accounts[1], web3.utils.toWei('0.9', 'ether')),
      )
      // now check if it can send 1 ether
      await truffleAssert.passes(
         demo.send(accounts[1], web3.utils.toWei('1', 'ether')),
      )
   });

     it('Sending from different account than owner should fail', async () => {
      // check if send function is working for normal case
      const demo = await Wallet.deployed();
      await truffleAssert.passes(
         demo.send(accounts[1],web3.utils.toWei('2', 'ether'),{from:accounts[0]}),
         'Send function should be implemented correctly.'
      )
      // check if someone other than owner calls send
      await truffleAssert.reverts(
         demo.send(accounts[1],web3.utils.toWei('1', 'ether'),{from:accounts[1]}),
      )
      //check if owner send
      await truffleAssert.passes(
         demo.send(accounts[1],web3.utils.toWei('1', 'ether'),{from:accounts[0]}),
      )
   });


});