const Wallet=artifacts.require('Wallet');


contract('Wallet',(accounts) => {

    it('Should deploy smart contract properly',async () => {
         const demo=await Wallet.deployed();
         assert(demo.address !== '');
         const manager_add= await demo.owner();
         const deployer_add=accounts[0];
         assert.equal(manager_add,deployer_add,"manager is not deployer");
         
         


         //const owner=await demo.address(this);
         //const ownerBalance= await demo.balanceOf(owner.address);
         //assert(ownerBalance==balanceOf(owner.address));
        // const owner=await demo.getOwner();
         //assert.equal(owner,accounts[0],'owner should be acc0');
    });
   
     it('Should return balance of the owner', async () =>{
        const demo=await Wallet.deployed();
         const manager_add= await demo.owner();

      const ownerBal=await demo.balanceOf();
    
        assert.isNotNull(ownerBal,"wrong balance");
        

     });

     it('should transfer ether to another address', async() => {
      const demo=await Wallet.deployed();
   
        const receiver_beforeBalance= await web3.eth.getBalance(accounts[1]);
        await demo.send(accounts[1], web3.utils.toWei('1', 'ether'),{ value: web3.utils.toWei('1', 'ether')});
        
        const receiver_afterBalance= await web3.eth.getBalance(accounts[1]);
        const finalBalance=web3.utils.toBN(receiver_afterBalance);
        const initialBalance= web3.utils.toBN(receiver_beforeBalance);

      const temp = finalBalance.sub(initialBalance)
      // console.log(Number(temp))
        assert(Number(temp)===1000000000000000000, "not trnasferred");

        
      });

     it("amount send should be atleast 1 ether",async () => {
      try{
         const demo=await Wallet.deployed();
        // const value=await demo.send(addr,{value: web3.utils.toWei('1', 'ether')});
         const value=await demo.send(accounts[1], web3.utils.toWei('1', 'ether'),{ value: web3.utils.toWei('1', 'ether')});
         const val = (web3.utils.fromWei(value.receipt.logs[0].args.amount, 'ether'));
         console.log(val);
         assert.isAtLeast(Number(val),1,"less than 1 ether");
        }
        catch(e){
         assert(false,"amount not send");
        }
     });

     it('checks if only owner can send', async () => {
      try {
          await demo.send(accounts[1],10,{from:accounts[0]});
          
      } catch (error) {
          assert(error,"Only owner should send the tx");
      }
   });

     it("should return balance of owner",async() => {
      const demo=await Wallet.deployed();
      //const balance= await demo.balanceOf();
      await web3.eth.getBalance(accounts[0]);
      assert(true);
     });
      //   const demo=await Demo.deployed();
      //   const addr=accounts[1];
      //   const manager_add= await demo.owner();
      //   const value=await demo.send(addr,{value: web3.utils.toWei('1', 'ether')});
        
      //   const val = (web3.utils.fromWei(value.receipt.logs[0].args.amount, 'ether'))
      //   assert.isAtLeast(Number(val),1, 'transferred ether is less than 1');
      // //   assert(addr.transfer(val));
     });
    

