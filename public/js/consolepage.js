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
            term.echo('Success! Welcome home, Agent.');
        } else {
            term.echo(email + "Didn't work!");
        }
    }).fail(function(res){
        term.echo(command + "Sorry. Our super-secret servers are currently down.");
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
            term.echo('Success! Welcome home, Agent.');
        } else {
            term.echo(email + "Didn't work!");
        }
    }).fail(function(res){
        term.echo(command + "Sorry. Our super-secret servers are currently down.");
    });
    
};

var help = function(term) {
    term.echo("Available commands are rules, profile, login, signup");
};

var profile = function(term) {
    term.push(function(command, term) {}, {
        prompt: 'test> ',
        name: 'test'
    });
}
var rules = function(term) {
    term.echo('Goal: Be the last agent standing. The winner gets full bragging rights within the Paranoia         ' +
        'community!                                                                                                                                                                                               ' +
        'How to play: Each agent will be assigned one target to eliminate, and each agent will in turn be    ' + 
        'pursued by another player. As no one knows who else may be playing, secrecy and stealth are         '+ 
        'paramount. To maintain a low profile, be discreet when eliminating your target. All games begin   ' + '  and end at midnight.                                                                                                                                                                                    ' +  
        'Eliminations:  When you eliminate an agent they will give their target to you. This person is       ' + 
        'your new target. Both players will immediately email the moderator so the leaderboard can be        ' + 
        'updated. Follow the same proceedure if you are eliminated.                                                                                                                                              ' +
        'Rules: No weapons of any kind are allowed. Players are eliminated by touching with fingers.         ' + 
        'To maintain your cover, all eliminations must be covert. You may not enter a dorm room uninvited.   ' + 
        'All areas of campus are fair game except the following: classrooms, the library, a ' +
        'player’s place   of employment, and vehicles.                                                                                                                                                                            ' +
        'Keep in mind this is a game that rewards sneakiness and vigilance. Keep your identity concealed.    ' + 
        'Play fair; don’t cheat. Above all, HAVE FUN!!');
}

var signup = function(term) {
    savedEmail = null;
    savedPassword = null;
    savedHandle = null;
    inSignUp = true;
    term.set_prompt('Agent login: Enter your top-secret email address: ')
}

var login = function(term) {
    savedHandle = null;
    savedPassword = null;
    inLogin = true;
    term.set_prompt('Agent login: Enter your handle: ') 
}

var loginPasswordCheck = function(term) {
    
    term.set_prompt('Agent login: Enter your top-secret password: ');
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
            term.set_prompt('Agent login: Enter your top-secret password: ');
        } else if (inSignUp && savedPassword === null) {
            savedPassword = command;
            term.set_prompt('Agent login: Enter your top-secret handle: ');

        } else if (inSignUp && savedHandle === null) { 
            savedHandle = command;
            sendToServer(term);
            term.set_prompt('~$');
            term.echo('Welcome to your profile, Agent ' + savedHandle + '.');
            term.echo('');
            term.echo('');
            term.echo('');
            term.echo('');
            term.echo('Your target is: Cobra');
            term.echo('Game location: UM Campus');
            term.echo('Time remaining in game: 3 days');
            term.echo('Surviving players: 2 / 30');

        } else if (inLogin && savedHandle === null) {
            loginHandleCheck(); 
        } else if (inLogin && savedPassword === null) {
            term.set_prompt('Agent login: Enter your top-secret password: ');
            savedPassword = command;
            term.set_prompt('Agent login: Enter your top-secret password: ');
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