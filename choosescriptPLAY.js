
// $(document).ready(function(){
//   var userPokemon = prompt("Choose your pokemon by it's PokeDex Number!");
//   userPokemon = parseFloat(userPokemon);
//   var pokemonConfirmed;
//   var
//   do {
//     if (userPokemon > 0 && userPokemon < 722){
//       var chosenURL = "http://pokeapi.co/api/v2/pokemon/" + userPokemon + "/";
//       $.get(chosenURL, function(userData){
//         userObject = userData;
//       }).done(function(){
//        pokemonConfirmed = confirm("You chose " + userObject.name +". Is that correct?");
//         if (pokemonConfirmed === false){
//           userPokemon = prompt("Choose your pokemon by it's PokeDex Number!");
//           console.log("keep trying!")
//         }
//       })
//     }
//     else {
//       userPokemon = prompt("Oops! Make sure you're entering a pokemon by it's number (1-721)");
//       pokemonChosen = false;
//       console.log("try again!")
//     }
//   } while(pokemonConfirmed === false);
//   console.log("this should work!")
// })



$(document).ready(function(){
  if(window.innerHeight > window.innerWidth){
    alert("PokeClone is best enjoyed in Landscape!");
}
  var desitnationAddress = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var destinationLat = 0;
  var destinationLon = 0;
  var distanceToDestination = 0;
  var userPokemon = "";
  var chosenURL = "";
  var userPokemonType = "";
  var userTypeURL = "";
  var userWeaknesses = [];
  var userStrengths = [];
  var rivalPokemon;
  var rivalPokemonType = "";
  var rivalWeaknesses = [];
  var rivalStrengths = [];
  var battleOdds = 1;
  var winTotal = 0;
  var lossTotal = 0;
  var startingLat;
  var startingLon;
  var currentLat;
  var currentLon;
  var distanceTraveled = 0;
  var battleCounter = 1;
  var rivalFrequency = 0;
  var addressConfirmed = false;
  var images = {
    normal: "https://upload.wikimedia.org/wikipedia/commons/1/16/Appearance_of_sky_for_weather_forecast,_Dhaka,_Bangladesh.JPG",
    fighting: "https://img0.etsystatic.com/003/0/5307718/il_fullxfull.360453384_aciz.jpg" ,
    flying: "http://4.bp.blogspot.com/-3c9fw_g0kXw/Tut4h-ILMcI/AAAAAAAAGzI/oRH91Ttm7nE/s1600/20123_FlyingBirds.jpg" ,
    poison: "http://blog.gogo-vacations.com/wp-content/uploads/2015/04/Slime.jpg",
    ground: "http://bgfons.com/upload/ground_texture886.jpg" ,
    rock: "http://janasays.com/wp-content/uploads/2012/05/rocks.jpg" ,
    bug: "https://www.johnnyetc.com/wp-content/uploads/2015/07/bugs-feature.jpg" ,
    ghost: "http://rdcnewscdn.realtor.com/wp-content/uploads/2015/10/haunted-house.jpg" ,
    steel: "http://www.architecturalmaterials.com/wp-content/uploads/2013/02/IMG_4719.jpg",
    fire: "http://www.liferunners.org/wp-content/uploads/2014/10/fire.jpg" ,
    water: "http://www.european-coatings.com/var/ezflow_site/storage/images/media/images/bb_lack_abperleffekt_wassertropfen_shutterstock_56441749.jpg/3371813-1-ger-DE/BB_Lack_Abperleffekt_Wassertropfen_shutterstock_56441749.jpg.jpg",
    grass: "https://upload.wikimedia.org/wikipedia/commons/7/78/FJM88NL_Grass_close_up.JPG" ,
    electric: "http://wallpaper.zone/img/3548346.jpg" ,
    psychic: "http://alternative-healing-therapies.com/wp-content/uploads/2014/11/Psychic-Awareness.jpg",
    ice: "http://nn4now.co.uk/wp-content/uploads/2015/05/textura_frozen_by_abeeediciones-d73azhl.png" ,
    dragon: "http://d.fastcompany.net/multisite_files/cocreate/imagecache/1280/article_feature/1280-dungeons-and-dragons.jpg" ,
    dark: "https://wallpaperscraft.com/image/dark_lines_background_black_65869_2560x1440.jpg",
    fairy: "http://img09.deviantart.net/c851/i/2016/069/b/8/navi_by_maintenancefairy-d9um379.png",
  };
  function getRival(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function blinker() {
    $('.blink_me').fadeOut(200);
    $('.blink_me').fadeIn(200);
  }
  setInterval(blinker, 400);

  function setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        startingLat = position.coords.latitude;
        startingLon = position.coords.longitude;
      })
    }
  }
  function newLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");}
    }
  function showPosition(position) {
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;
    distanceToDestination = Math.sqrt(Math.pow(currentLat-destinationLat, 2)+Math.pow(currentLon-destinationLon, 2));
    console.log(destinationLat);
    console.log(destinationLon);
    console.log(distanceToDestination);
    distanceTraveled = Math.sqrt(Math.pow(currentLat-startingLat, 2)+Math.pow(currentLon-startingLon, 2));
    if (distanceTraveled > (rivalFrequency * battleCounter) && distanceToDestination > 0.0002) {
      navigator.vibrate(1000);
      battleCounter ++;
      battleOdds = 1;
      $(".rivalPokemon").empty();
      $(".rivalPokemon").css("background-image", "url('loading.gif')");
      rivalPokemon = getRival(1, 721);
      var rivalPokemonURL = "https://pokeapi.co/api/v2/pokemon/" + rivalPokemon + "/";
      $.get(rivalPokemonURL, function(rivalData){
        rivalPokemon = rivalData.name.toUpperCase();
        rivalPokemonType = rivalData.types[rivalData.types.length-1].type.name;
        rivalTypeURL = rivalData.types[rivalData.types.length-1].type.url;
        $(".rivalPokemon").append("<h1>"+rivalPokemon+"</h1>");
        $(".rivalPokemon").append("<h2>"+rivalPokemonType.toUpperCase()+"</h2>");
        for (type in images){
          if (type === rivalPokemonType){
            var rivalTypeImage = "url(" + images[type]+ ")";
          };
        }
        $(".rivalPokemon").css("background-image", rivalTypeImage);
      }).done(function(){
        for(i=0;i<userWeaknesses.length;i++){
          if(userWeaknesses[i] === rivalPokemonType){
            battleOdds = 2;
          }
        }
        for(i=0;i<userStrengths.length;i++){
          if(userStrengths[i] === rivalPokemonType){
            battleOdds = 3;
          }
        }
      }).done(function(){
        $(".rivalPokemon").append("<h1 class='oddsMessage'></h1>")
        var outcome = Math.random();
        if(battleOdds === 1){
          if(outcome > .5){
            $(".oddsMessage").text("Fair match! Let's see how you do!").fadeIn(500).delay(2000).fadeOut(500);
            setTimeout(function() {
              $(".oddsMessage").text("You win!").fadeIn(500).delay(2000).fadeIn(500);
            }, 3000);
            winTotal ++;
          }
          else{
            $(".oddsMessage").text("Fair match! Let's see how you do!").fadeIn(500).delay(2000).fadeOut(500);
            setTimeout(function() {
              $(".oddsMessage").text("Bah! You lost! Nice effort!").fadeIn(500).delay(2000).fadeIn(500);
            }, 3000);
            lossTotal ++;
          }
        }
        else if(battleOdds === 2){
          if(outcome > .8){
            $(".oddsMessage").text("Uh oh! This isn't looking good...").fadeIn(500).delay(2000).fadeOut(500);
            setTimeout(function() {
              $(".oddsMessage").text("You win!").fadeIn(500).delay(2000).fadeIn(500);
            }, 3000);
            winTotal ++;
          }
          else{
            $(".oddsMessage").text("Uh oh! This isn't looking good").fadeIn(500).delay(2000).fadeOut(500);
            setTimeout(function() {
              $(".oddsMessage").text("Bah! You lost! Nice effort").fadeIn(500).delay(2000).fadeIn(500);
            }, 3000);
            lossTotal ++;
          }
        }
        else{
          if(outcome > .2){
            $(".oddsMessage").text("Looking good! Fingers crossed!").fadeIn(500).delay(2000).fadeOut(500);
            setTimeout(function() {
              $(".oddsMessage").text("You win!").fadeIn(500).delay(2000).fadeIn(500);
            }, 3000);
            winTotal ++;
          }
          else{
            $(".oddsMessage").text("Looking good! Fingers crossed!").fadeIn(500).delay(2000).fadeOut(500);
            setTimeout(function() {
              $(".oddsMessage").text("Bah! You lost! Nice effort").fadeIn(500).delay(2000).fadeIn(500);
            }, 3000);
            lossTotal ++;
          }
        }
        $(".winTotal").empty();
        $(".winTotal").append("WINS: " + winTotal + "    LOSSES: " + lossTotal);

      })
    }
    else if (distanceToDestination <= 0.0005) {
      navigator.vibrate(3000);
      $(".gameplay").empty();
      if(lossTotal === 0){
        $(".score").empty();
        $(".score").append("<h1 id='final'>UNDEFEATED! PokeMASTER!</h1>");
        $(".score").append("<h2 class='counter blink_me final'> WINS: " + winTotal + "   LOSSES: " + lossTotal + "</h2>");
        $(".score").css("background-image", "url('master.jpg')");
        $(".score").css("height", "100vh");
      }
      else if (lossTotal < winTotal) {
        $(".score").empty();
        $(".score").append("<h1 id='final'>You made it! Not bad!</h1>");
        $(".score").append("<h2 class='counter blink_me final'> WINS: " + winTotal + "   LOSSES: " + lossTotal + "</h2>");
        $(".score").css("background-image", "url('trainon.jpg')");
        $(".score").css("height", "100vh");
      }
      else if (lossTotal === winTotal) {
        $(".score").empty();
        $(".score").append("<h1 id='final'>Not your best. Try again!</h1>");
        $(".score").append("<h2 class='counter blink_me final'> WINS: " + winTotal + "   LOSSES: " + lossTotal + "</h2>");
        $(".score").css("background-image", "url('trainon.jpg')");
        $(".score").css("background-size", "contain");
        $(".score").css("background-repeat", "no-repeat");
        $(".score").css("background-position", "center");
        $(".score").css("height", "100vh");
        $("#final").css("margin-bottom", "55vh")
        console.log("this should work");
      }
      else {
        $(".score").empty();
        $(".score").append("<h1 id='final'>Ehh. Professor Oak wants a word...</h1>");
        $(".score").append("<h2 class='counter blink_me final'> WINS: " + winTotal + "   LOSSES: " + lossTotal + "</h2>");
        $(".score").css("background-image", "url('oak.jpg')");
        $(".score").css("background-size", "contain");
        $(".score").css("background-repeat", "no-repeat");
        $(".score").css("background-position", "center");
        $(".score").css("height", "100vh");
      }
    }
  }
  $("#selectDestination").on("click", function(event){
    desitnationAddress = desitnationAddress + $('.address').val() + "&key=AIzaSyAXu3WBe8npGIQd2KleoYLNp-hmwWqgzBQ";
    desitnationAddress = desitnationAddress.replace(/ /g,"+");
    rivalFrequency = parseFloat($("#rivalFrequency").val());
    $.get(desitnationAddress, function(addressData){
      destinationLat = addressData.results[0].geometry.location.lat;
      destinationLon = addressData.results[0].geometry.location.lng;
      // addressConfirmed = confirm("You're " + $("#rivalFrequency").innerHTML + " to " + addressData.results[0].formatted_address +". Is that correct?")
    })
    // }).done(function(){
      // if (addressConfirmed === true){
        // console.log("confirming!");
      $(".pregame").empty();
      $(".container-fluid").css("background-image", "none");
      $(".pregame").append('<form class="choosePokemon" action="" method="post" id="selection">'+
        '<input type="number" min="1" max="721" placeholder="Enter Pokemon Number" id="textSelection">'+
        '<input type="submit" value="I Choose You!" id="submission"></form>');
      $(".displayPokemon").css("height", "90vh");
      $(".displayPokemon").append("<img src='pointing.jpg' height=50%/>");
      $(".displayPokemon").append("<h1>Choose your Pokemon by their PokeDex number up here! <br>You can change your mind before you start!</h1>")
      // }
    //   else{
    //     desitnationAddress = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    //   }
    // })
  $("#selection").on("submit", function(event){
    event.preventDefault();
    userStrengths = [];
    userWeaknesses = [];
    $(".landingPage").css("background-image", "none");
    $(".landingPage").css("height", "auto");
    $(".rivalPokemon").css("height", "90vh")
    $(".counter").css("height", "auto")
    $(".displayPokemon").empty();
    $(".pregame").append('<div id="start">'+'</div>')
    $("#start").empty();
    $("#start").append("<button>Start!</button>");
    $("#submission").replaceWith('<input type="submit" value="Change Pokemon" id="submission">');
    userPokemon = $("#textSelection").val();
    userPokemon = parseFloat(userPokemon);
    chosenURL = "https://pokeapi.co/api/v2/pokemon/" + userPokemon + "/";
    $.get(chosenURL, function(userData){
      userPokemon = userData.name.toUpperCase();
      userPokemonType = userData.types[userData.types.length-1].type.name;
      userTypeURL = userData.types[userData.types.length-1].type.url;
      $(".displayPokemon").append("<h1>"+userPokemon+"</h1>");
      $(".displayPokemon").append("<h2>"+userPokemonType.toUpperCase()+"</h2>");
      for (type in images){
        if (type === userPokemonType){
          var userTypeImage = "url(" + images[type]+ ")";
        }
      }
      $(".displayPokemon").css("background-image", userTypeImage)
      $(".displayPokemon").css("border-right", "1vw solid black")
      $.get(userTypeURL, function(damageRelations){
        $(".displayPokemon").append("<p class='strengths'>STRENGTHS</p>");
        $(".displayPokemon").append("<p class='weaknesses'>WEAKNESSES</p>");
        if (damageRelations.damage_relations.double_damage_to.length === 0){
          $(".strengths").append("<p>None</p>");
        }
        else{
          for (i=0;i<damageRelations.damage_relations.double_damage_to.length;i++){
            userStrengths.push(damageRelations.damage_relations.double_damage_to[i].name);
            $(".strengths").append("<p>"+damageRelations.damage_relations.double_damage_to[i].name+"</p>");
          }
        }
        if(damageRelations.damage_relations.double_damage_from.length === 0){
          $(".weaknesses").append("<p>None</p>");
        }
        else{
          for (i=0;i<damageRelations.damage_relations.double_damage_from.length;i++){
            userWeaknesses.push(damageRelations.damage_relations.double_damage_from[i].name);
            $(".weaknesses").append("<p>"+damageRelations.damage_relations.double_damage_from[i].name+"</p>");
          }
        }
      })
    })
    $("#start").on("click", function(event){
      $(".pregame").empty();
      $(".rivalPokemon").empty();
      $(".rivalPokemon").append("<h1 class='begin'>Head to your destination now!</h1>" + "<h2 class='begin'>It's dangerous out there. Look out for wild Pokemon!</h2>")
      setLocation();
      newLocation();
    })
  })
  })
})
