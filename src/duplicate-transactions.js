function findDuplicateTransactions(transactions) {
    const doubleTransaction = transactions.slice().sort((a, b) => {
      return a.id - b.id;
   })

   const result = [];
   const timeCheck = (time1, time2) => {
     return (new Date(time1).getTime() - new Date(time2).getTime())/60000;
   }

    while(doubleTransaction.length){
       const member = [];
       let reference = doubleTransaction.shift()

       member.push(reference);


       for(let i = 0; i < doubleTransaction.length; i++) {
         if(reference.sourceAccount === doubleTransaction[i].sourceAccount &&
            reference.targetAccount === doubleTransaction[i].targetAccount &&
            reference.amount === doubleTransaction[i].amount &&
            reference.category === doubleTransaction[i].category && timeCheck(doubleTransaction[i].time, reference.time) <= 1){

             member.push(doubleTransaction[i]);
             reference = doubleTransaction[i];
             doubleTransaction.splice(i, 1);
             i -= 1;
           }
       }
       if(member.length > 1){
       result.push(member);
       }
     }
    return result;
   }

   export default findDuplicateTransactions;
