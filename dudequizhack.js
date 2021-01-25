function test(name, score){
    var quizParam = (location.search.split('quiz=')[1]);

    var answers = '';
    var QUESTIONS_AMOUNT = 30;
    var questionNumber = 1;
    var numbers = [];
    var correctAnswers = '';
    var realQuizId = quizParam.split("&")[0];
    var currentQuestion = 0;

    var dataObject = {
        quizId: realQuizId,
        //friend: readCookie("name"),
        friend: name,
        answers: answers,
        score: score,
        quizLanguage: quizLanguage
    };

    data = JSON.stringify(dataObject);
    $.ajax({
        type: "POST",
        url: serverAddress + "/save-dudes-result",
        data: data,
        contentType: 'application/json;charset=UTF-8',
        dataType: "json",
        success: function (result) {
            sendEvent("result", "resultSaved", quizLanguage);
            createCookie(realQuizId, score, 365);
            createCookie(realQuizId + "_answers", answers, 365);

            var yourResults = readCookie("yourResults");
            if(yourResults === null || yourResults === undefined) {
                yourResults = realQuizId;
            } else {
                yourResults += "_" + realQuizId;
            }
            createCookie("yourResults", yourResults, 365);


            showResultPage(score);
        },
        error: function (result) {
            //sendEvent("exception", "save-dudes-quiz", data);
        }
    });
};