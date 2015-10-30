

jQuery(document).ready(function($) {
    var id = 1;
    $('#console').terminal(function(command, term) {
        if (command == 'help') {
            term.echo("available commands are rules, game, profile, login, signout");
        } else if (command == 'profile'){
            term.push(function(command, term) {
                if (command == 'help') {
                    term.echo('if you type ping it will display pong');
                } else if (command == 'ping') {
                    term.echo('pong');
                } else {
                    term.echo('unknown command ' + command);
                }
            }, {
                prompt: 'test> ',
                name: 'test'});
        } else if (command == 'rules') {
            term.echo('Goal: How to play: Getting your target: Once the game begins, the moderator will email your target. You will receive a picture of the player, their name, and their handle. When you eliminate a player: Upon eliminating your target, the target should give you their badge number and the information about the target they were assigned. This person is now your target. As soon as possible, email the moderator so the leaderboard can be updated. When you are eliminated: Give your target Winner takes all:');
        
        } else if (command == "js") {
            term.push(function(command, term) {
                var result = window.eval(command);
                if (result != undefined) {
                    term.echo(String(result));
                }
            }, {
                name: 'js',
                prompt: 'js> '});
        } else if (command == 'signup') {
            term.push(function(email, term){
    console.log(email);
    var data = {email: email,};
    jQuery.post("http://localhost:7000/api/playerRoutes", data)
    .done(function (data){
        console.log(data)
        if(data != null){
            term.echo('Success! Welcome home, agent.');
        } else {
            term.echo(command + " You done fucked up!");
        }
    }).fail(function(res){
        term.echo(command + "Sorry. Our super-secret servers are currently down. As far as you know...");
    });
}, {
    prompt: 'Assassin login: Enter your top-secret email address: ',
    name: ''
});

} else if (command == 'login') {
  term.push(function(email, term){
    console.log(email);
    jQuery.get("http://localhost:7000/api/players/user/" + email)
    .done(function (data){
        console.log(data)
        if(data != null){
            term.echo('Success! Welcome home, agent.');
        } else {
            term.echo(command + " is not a valid username. Try again.");
        }
    }).fail(function(res){
        term.echo(command + "Sorry. Our super-secret servers are currently down. As far as you know...");
    });
}, {
    prompt: 'Assassin login: Enter your top-secret email address: ',
    name: ''
});
} else {
    term.echo("unknown command " + command);
}
}, {
    greetings: "Type login to access your account, agent.",
    onBlur: function() {
            // prevent loosing focus
            return false;
        }
    });
});