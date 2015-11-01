var inSignUp = false;
var inLogin = false;


var savedEmail = null;
var savedPassword = null;
var savedHandle = null;

var sendToServer = function(term) {
    var data = {
        email: savedEmail, 
        password: savedPassword, 
        handle: savedHandle
    };
    jQuery.post("http://localhost:7000/api/playerRoutes", data)
    .done(function (data){


        if(data != null){
            term.echo('Success! Welcome home, agent.');
        } else {
            term.echo(email + " Didn't work!");
        }
    }).fail(function(res){
        term.echo(command + "Sorry. Our super-secret servers are currently down. As far as you know...");
    });
    
};
var loginServer = function(term) {
    var data = {
        email: savedEmail, 
        password: savedPassword,     
    };
    jQuery.get("http://localhost:7000/api/playerRoutes/" + data)
    .done(function (data){

        if(data != null){
            term.echo('Success! Welcome home, agent.');
        } else {
            term.echo(email + " Didn't work!");
        }
    }).fail(function(res){
        term.echo(command + "Sorry. Our super-secret servers are currently down. As far as you know...");
    });
    
};

var help = function(term) {
    term.echo("available commands are rules, game, profile, login, signout");
};

var profile = function(term) {
    term.push(function(command, term) {}, {
        prompt: 'test> ',
        name: 'test'
    });
}
var rules = function(term) {
    term.echo('Goal: Be the last one standing. How to play:  ' + 
        'Each assassin’s job is to stay shrouded in secrecy.  Therefore, all kills must be accomplished without anyone else seeing.' +
        'This rule is important, as you will not know who else may be playing. '+
        'You must eliminate this person while keeping your own identity concealed. ' +   
        'When you eliminate a player:  Upon eliminating your target, the target should give you ' +
        'their badge number and the information about the target they were assigned. ' +
        'This person is now your target.  As soon as possible, email the moderator so the leaderboard can be updated. ' +
        'If you are eliminated:  Give your target to your killer.  Contact the moderator immediately so the leader board can be updated. ' +
        'Winner takes all:  The last agent standing will receive... ' +
        'Rules: No weapons of any kind are allowed. Players are eliminated by touching the target with  your fingers. ' +
        'You may not enter a person’s dorm room uninvited.  All areas of campus are fair game except the following: ' +
        'Classrooms.          Bathrooms.        The library. ' +
        'A player’s place of employment.        Vehicles, whether moving or parked. ' +
        'Keep in mind this is a game that rewards sneakiness and vigilance. Keep your identity concealed.  Play fair, don’t cheat. (In other words, don’t be “That Guy”.)  HAVE FUN!!');
}

var signup = function(term) {
    savedEmail = null;
    savedPassword = null;
    savedHandle = null;
    inSignUp = true;
    term.set_prompt('Assassin login: Enter your top-secret email address: ')
}

var login = function(term) {
    savedHandle = null;
    savedPassword = null;
    inLogin = true;
    term.set_prompt('Assassin login: Enter your handle: ') 
}

var loginPasswordCheck = function(term) {
    
    term.set_prompt('Assassin login: Enter your top-secret password: ');
    loginServer(term);
    term.set_prompt('~$');
    term.echo('Welcome back, Agent ' + savedHandle + '.');
}
var loginHandleCheck = function(term, command) {
    savedHandle = command;
    
}

jQuery(document).ready(function($) {
    var id = 1;
    $('#console').terminal(function(command, term) {
        if (inSignUp && savedEmail === null) {
            savedEmail = command;
            term.set_prompt('Assassin login: Enter your top-secret password: ');
        } else if (inSignUp && savedPassword === null) {
            savedPassword = command;
            term.set_prompt('Assassin login: Enter your top-secret handle: ');

        } else if (inSignUp && savedHandle === null) { 
            savedHandle = command;
            sendToServer(term);
            term.set_prompt('~$');
            term.echo('Welcome to your profile, Agent ' + savedHandle + '.');
            term.echo('');
            term.echo('');
            term.echo('');
            term.echo('');
            term.echo('You have been assigned to eliminate.......Cobra');
            term.echo('Arena.....................................UM Campus');
            term.echo('Time remaining in game....................3 days');
            term.echo('Surviving players.........................2 / 30');

        } else if (inLogin && savedHandle === null) {
            loginHandleCheck(); 
        } else if (inLogin && savedPassword === null) {
            term.set_prompt('Assassin login: Enter your top-secret password: ');
            savedPassword = command;
            term.set_prompt('Assassin login: Enter your top-secret password: ');
            loginServer(term);
            term.set_prompt('~$');
            term.echo('Welcome back, Agent ' + savedHandle + '.');
        } else if (command == 'help') {
            help(term);
        } else if (command == 'profile') {
            profile(term);
        } else if (command == 'rules') {
            rules(term);      
        } else if (command == 'signup') {
            signup(term);
        } else if (command == 'login') {
            login(term);
        } else {
            term.echo("unknown command " + command);
        }
    }, {
        greetings: "To create an account, type 'signup'. ",
        onBlur: function() {
            // prevent loosing focus
            return false;
        }
    });
});