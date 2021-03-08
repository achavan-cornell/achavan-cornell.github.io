function getLoanValues(){
    let loanValues = {
        loanAmount:document.getElementById("principle").value,
        annualInterestrate:document.getElementById("apr").value,
        loanDuration:document.getElementById("years").value
      
     };

     return loanValues
}

function displayPaymentInfo(loanValues){
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
        suggested_emi:suggested_emi.toFixed(2),
        total_time :(total_months/12).toFixed(2),
        interestDiff :(paymentInfo.interest-total_interest).toFixed(2),
        paymentDiff:(suggested_emi-paymentInfo.emi).toFixed(0)
    };

    return suggestedPayments

}


function displaySuggestedPayments_sentence(suggestedPaymentInfo){
    let message = '<p> If you pay <b><u>$'+suggestedPaymentInfo.suggested_emi+'/month</u></b> instead,';
    message = message+' you will pay off your load in <b><u>'+suggestedPaymentInfo.total_time+'</u></b> years.';
    message = message+' You will save <b><u>$'+suggestedPaymentInfo.interestDiff+'</u></b> on interest.';

    message = message+' $'+suggestedPaymentInfo.paymentDiff+' per month is '+createCompareString(suggestedPaymentInfo.paymentDiff);
    message = message+'</p>';
    document.getElementById("suggested").innerHTML = message;
}
function createDiv(label, value){
    let msg = '';
    console.log("values : "+label+value);

    let div_start = '<div class=\'sug-div\'>';
    let lable_div = '<div class=\'sug-div-lable\'>'+label+'</div>';
    let value_div = '<div class=\'sug-div-value\'>'+value+'</div>';
    let div_end = '</div>';
    
    msg = div_start+lable_div+value_div+div_end;
    console.log(msg);
    return msg
}
function displaySuggestedPayments_bullets(suggestedPaymentInfo){
    let label = 'Suggested Payment:';
    let value = '<b>$'+suggestedPaymentInfo.suggested_emi+'/month</b>';
    let div1 = createDiv(label,value);

    label = 'Payoff Period:';
    value = '<b>'+suggestedPaymentInfo.total_time+' Years</b>';
    let div2 = createDiv(label,value);

    label = 'Interest Saved:';
    value = '<b>$'+suggestedPaymentInfo.interestDiff+'</b>';
    let div3 = createDiv(label,value);
    
    let message = div1+div2+div3;
    console.log(label+value);
    document.getElementById("suggested").innerHTML = message;
}




function loanCalculator1(){
    console.log("HI in loanCalculator function");
    /**
     * get the loan parameters from the form
     */

     let loanValues = getLoanValues();
     console.log(loanValues);

    /**
     * calculate and diplay monthly payments. 
     */
    let paymentInfo= displayPaymentInfo(loanValues);
    console.log(paymentInfo)
    /**
     * Calculate faster payment option.
    */
    let suggestedPaymentInfo = getSuggestedPayments(loanValues,paymentInfo);
     console.log(suggestedPaymentInfo)
    /**
     * Display the suggested payment plan using sentences.
    */
    displaySuggestedPayments_bullets(suggestedPaymentInfo);
   // console.log(suggested_emi);
 
    return false
}


function loanCalculator(){
    console.log("HI in loanCalculator function");
    /**
     * get the loan parameters from the form
     */

     let loanValues = getLoanValues();
     console.log(loanValues);

    /**
     * calculate and diplay monthly payments. 
     */
    let paymentInfo= displayPaymentInfo(loanValues);
    console.log(paymentInfo)
    /**
     * Calculate faster payment option.
    */
    let suggestedPaymentInfo = getSuggestedPayments(loanValues,paymentInfo);
     console.log(suggestedPaymentInfo)
    /**
     * Display the suggested payment plan using sentences.
    */
    displaySuggestedPayments_sentence(suggestedPaymentInfo);
   // console.log(suggested_emi);
 
    return false
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