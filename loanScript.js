function getLoanValues(){
    let loanValues = {
        loanAmount:document.getElementById("principle").value,
        annualInterestrate:document.getElementById("apr").value,
        loanDuration:document.getElementById("years").value
      
     };

     return loanValues
}

function displayPaymentInfo(){
    let loanValues = getLoanValues();
    console.log(loanValues);

    paymentInfo = getEMIAndInterest(loanValues);
    document.getElementById("emi").innerHTML="Monthly Payment: <b>$"+paymentInfo.emi+"</b>";
    document.getElementById("interest-paid").innerHTML = 'Total Interest Paid: <b>$'+paymentInfo.interest+'</b><br>';
    return paymentInfo
}

function createCompareString(diff){
    let addMessage ='';
    if(diff<=20){
        addMessage = 'one coffee per week.';
    }
    else if(diff<=30){
        addMessage = 'a pizza per week.';
    }
    else{
        addMessage = 'a pizza and a coffee per week.';
    }
    return addMessage
}

function getSuggestedPayments(loanValues,paymentInfo){
    let suggested_emi = Math.ceil(paymentInfo.emi/50) *50;

    let principle = loanValues.loanAmount;
    let aprMonthly = loanValues.annualInterestrate/1200;
    let total_interest = 0;
    let total_months = 0;

    while(principle>0){
        let interest = principle * aprMonthly;
        principle = principle - (suggested_emi - interest);
        total_interest = total_interest + interest;
        total_months = total_months + 1;
    }

    const suggestedPayments = {
        total_time :(total_months/12).toFixed(2),
        total_interest :total_interest.toFixed(2),
        interestDiff:(suggested_emi-paymentInfo.emi).toFixed(0)
    };

    return suggestedPayments

}


function displaySuggestedPayments_sentence(suggestedPaymentInfo){
    let message = '<p> If you pay <b><u>$'+suggested_emi+'/month</u></b> instead,';
    message = message+' you will pay off your load in <b><u>'+timeAndInterest.total_time+'</u></b> years.';
    message = message+' You will save <b><u>$'+(paymentInfo.interest-timeAndInterest.total_interest).toFixed(2)+'</u></b> on interest.';

    message = message+' $'+suggestedPaymentInfo.diff+' per month is '+createCompareString(suggestedPaymentInfo.diff);
    message = message+'</p>';
    document.getElementById("suggested").innerHTML = message;
}

function loanCalculator(){
    console.log("HI in loanCalculator function");
    
    /**
     * calculate and diplay monthly payments. 
     */
    let paymentInfo= displayPaymentInfo();
    
    /**
     * Calculate faster payment option.
     */
    let suggestedPaymentInfo = getSuggestedPayments(loanValues,paymentInfo);
     
    /**
     * Display the suggested payment plan using sentences.
     */
    displaySuggestedPayments_sentence(suggestedPaymentInfo);
    console.log(suggested_emi);
   
    return false
}

function getTimeAndInterest(loanValues, suggested_emi){
    

   

    return timeAndInterst

}


function getEMIAndInterest(loanValues){
    aprMonthly = loanValues.annualInterestrate/1200;
    periodInMonths = loanValues.loanDuration*12;
    numerator = loanValues.loanAmount * aprMonthly * Math.pow((1+aprMonthly),periodInMonths);
    denominator =  Math.pow((1+aprMonthly),periodInMonths) - 1;
    emi= numerator/denominator;
    total_payment = periodInMonths * emi;
    interest_paid = total_payment-loanValues.loanAmount;
    const payment ={
        emi: emi.toFixed(2),
        interest:interest_paid.toFixed(2)
    };

    return payment

}