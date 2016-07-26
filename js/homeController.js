var myApp = angular.module('myApp', []);

//myApp.directive('myDirective', function() {});
//myApp.factory('myService', function() {});

myApp.controller('MyCtrl', function MyCtrl($scope) {
    $scope.name = 'Superhero';
    $scope.editing = false;
    $scope.themeName = "bs3";

    //Black Jack vars
    $scope.gaming = false;      //Flag for gaming
    $scope.trash = [];          //discard pile
    $scope.deck = getCards();   //Deck of Cards
    $scope.players = [
        { name: "Player", cards: []},
        { name: "Dealer", cards: []} 
    ];
    //$scope.dealerHand = [];     //Dealers Hand
    //$scope.userHand = [];       //Users hand



    $scope.selectedRow = null;
    $scope.rows = generateRows(Math.round(Math.random() * (5 - 1) + 1));


    $scope.selectTableRow = function (row) {
        if ($scope.selectedRow == row) {
            $scope.selectedRow = null;
        } else {
            $scope.selectedRow = row;
        }
    }

    $scope.meh = function() {
        alert('hello world');
        $scope.selectedRow = null;
    }

    $scope.editName = function () {
        $scope.editing = true;
    }

    function generateRows(x) {
        var rows = [], j = x;

        for (var i = 0; i < x; i++) {
            rows.push({
                col1: "Data" + i,
                col2: "Data" + j
            });
            j--;
        }

        return rows;
    }
    
    /**
     * Builds the deck of cards. Creates an array of card objects with a
     * suit and value property.
     */
    function getCards() {
        var genDeck = [];
        var suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
        var cards = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

        for(var i = 0; i < suits.length ; i++) {
            var currSuit = suits[i];
            for(var k = 0; k < cards.length ; k++) {
                var currCard = cards[k];
                genDeck.push({
                    suit: currSuit,
                    value: currCard
                });
            }
        }

        //Be sure to shuffle it
        genDeck = shuffle(genDeck);
        return genDeck;
    }

    /**
     * Randomly shuffle the items in an array
     * From: http://stackoverflow.com/a/2450976/2593877
     * 
     * @param  {array} array - The array to have its items shuffled
     * @returns {array} array - The array with the items in it shuffled
     */
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /**
     * Deals out cards to the player and the dealer. First makes sure the
     * gaming flag is set and that both hands are empty, if not then it 
     * puts the cards in the hands in the trash pile.
     */
    $scope.dealOutCards = function() {
        if($scope.gaming === false){
            $scope.gaming = true;
        }

        for (var i = 0; i < $scope.players.length; i++) {
            var currPlayer = $scope.players[i];
            if (currPlayer.cards.length > 0) {
                $scope.trash.concat(currPlayer.cards);
                currPlayer.cards = [];
            }
        }

        for(var x = 0; x < 2 ; x++) {
            for (var i = 0; i < $scope.players.length; i++) {
                var currPlayer = $scope.players[i];
                var currCard = $scope.deck.splice(0,1)[0];
                currPlayer.cards.push(currCard);
            }
        }

    }//End dealOutCards()

    /**
     * Resets everything, the deck is cleared and then built again.
     * The trash is cleared, the players hand is cleared, and the 
     * dealers hand is cleared. The gaming flag is also set to false.
     */
    $scope.resetDeck = function() {
        $scope.deck = [];
        $scope.trash = [];
        $scope.deck = getCards();
        $scope.userHand = [];
        $scope.dealerHand = [];
        $scope.gaming = false;
    }

    $scope.cardsTotal = function(player) {
        var total = 0;

        for (var i = 0; i < player.cards.length; i++) {
            var card = player.cards[i];
            var value = card.value;

            if(value == "King" || value == "Queen" || value == "Jack") {
                total += 10;
            } else if(value == "Ace") {
                if (total + 11 <= 21) {
                    total += 11;
                } else {
                    total += 1;
                }
            } else {
                total += parseInt(value);
            }
        }

        return total;
    }
    
});