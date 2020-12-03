/*----------*/
let Quiz = function(problems) {
    this.score = 0;
    this.problems = problems;
    this.currentProblem = problems[0];
    this.index = 0;
    this.previousIndex = 0;
    this.previousProblem = problems[0];
    this.questionAnswered = 0;
    this.userName = null;

    this.show = function() {
        this.currentProblem.getKeyId();
        document.getElementById("questionNum").innerHTML = "Question " + (this.index + 1);
        document.getElementById("question").innerHTML = this.currentProblem.question;

        if (this.questionAnswered < problems.length)
        {
            if (!this.previousProblem.done){
                var element = document.getElementById("q" + this.previousIndex);
                element.style.border = "1px solid";
                element.style.backgroundColor = "white";
            }
            else{
                if (this.previousProblem.isTrue){
                    var element = document.getElementById("q" + this.previousIndex);
                    element.style.border = "1px solid";
                    element.style.backgroundColor = "#069E2D";
                }
                else{
                    var element = document.getElementById("q" + this.previousIndex);
                    element.style.border = "1px solid";
                    element.style.backgroundColor = "#ED1313";
                }
            }

            var current = document.getElementById("q" + this.index);
            current.style.border = "3px solid";
            current.style.backgroundColor = "yellow";

            this.previousIndex = this.index;
            this.previousProblem = this.currentProblem;

            if (this.index == 0)
                document.getElementById("back").style.display = "none";

            else if (this.index == (this.problems.length - 1))
                document.getElementById("next").style.display = "none";
            else{
                document.getElementById("back").style.display = "inline-block";
                document.getElementById("next").style.display = "inline-block";
            }

            if (!this.currentProblem.done)
            {
                for (let i = 0; i < this.currentProblem.choices.length; i++) {
                    let element = document.getElementById("label" + i);
                    element.innerHTML = this.currentProblem.choices[i];
                }
                for (let i = 0; i < this.currentProblem.choices.length; i++) 
                    self.choose("button" + i, this.currentProblem.choices[i]);  
            }

            else
            {
                for (let i = 0; i < this.currentProblem.choices.length; i++) {
                let element = document.getElementById("label" + i);
                element.innerHTML = this.currentProblem.choices[i];
                }

                for (var i = 0; i < 4; i++)
                    document.getElementById("button" + i).disabled = true;

                if (this.currentProblem.keyId == this.currentProblem.answerId)
                    document.getElementById(this.currentProblem.keyId).style.backgroundColor = "#069E2D";
                else
                {
                    document.getElementById(this.currentProblem.keyId).style.backgroundColor = "#069E2D";
                    document.getElementById(this.currentProblem.answerId).style.backgroundColor = "#ED1313";
                }
            }
        }
    }

    this.update = function() {
        this.currentProblem = this.problems[this.index];
    }


    this.choose = function(id, answer) {
        var button = document.getElementById(id);

        button.onclick = () => {
            if (this.currentProblem.isCorrectAnswer(answer)) {
                this.score++;

                document.getElementById(id).style.backgroundColor = '#069E2D';
                this.currentProblem.done = true;
                this.questionAnswered++;
                this.currentProblem.answerId = id;
                this.currentProblem.isTrue = true;

                document.getElementById("q" + this.index).style.backgroundColor = "#069E2D";
                self.disableAllButton(true);

                if (this.questionAnswered == (this.problems.length)){
                    clearInterval(idVar);
                    setTimeout(function(){showStats();}, 500);
                }
            } 
            else {
                this.currentProblem.getKeyId();
                document.getElementById(id).style.backgroundColor = '#ED1313';
                document.getElementById(this.currentProblem.keyId).style.backgroundColor = "#069E2D";
                document.getElementById("q" + this.index).style.backgroundColor = "#ED1313";

                this.currentProblem.answerId = id;
                this.currentProblem.done = true;
                this.questionAnswered++;
                this.currentProblem.isTrue = false;
                self.disableAllButton(true);
    
                if (this.questionAnswered == (this.problems.length)){
                    clearInterval(idVar);
                    setTimeout(function(){showStats();}, 500);
                }
            }
        }
    }

    this.disableAllButton = function(status) {
        for (let i = 0; i < this.currentProblem.choices.length; i++) {
            var tag = '#button' + i;
            button = document.querySelector(tag);
            button.disabled = status;
        }
    }

    this.reset = function() {
        self.disableAllButton(false);
        for (let i = 0; i < this.currentProblem.choices.length; i++) {
            var tag = 'button' + i;
            document.getElementById(tag).style.backgroundColor = 'rgba(233, 230, 239, 0.3)';
        }
    }
    self = this;
}


// picked = [];
//         while(picked.length())
//         var pick = Math.floor(Math.random() * 10);
//         if(!picked.includes(pick) && pick < 10) picked.push(pick);
