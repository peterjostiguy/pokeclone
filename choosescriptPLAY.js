
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
  var startingLat;
  var startingLon;
  var currentLat;
  var currentLon;
  var distanceTraveled = 0;
  var battleCounter = 1;
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
    $(".rivalPokemon").css("background-image", "url('loading.gif')");
    distanceToDestination = Math.sqrt(Math.pow(currentLat-destinationLat, 2)+Math.pow(currentLon-destinationLon, 2));
    console.log(destinationLat);
    console.log(destinationLon);
    console.log(distanceToDestination);
    distanceTraveled = Math.sqrt(Math.pow(currentLat-startingLat, 2)+Math.pow(currentLon-startingLon, 2));
    if (distanceTraveled > (0.00073 * battleCounter) && distanceToDestination > 0.0002) {
      battleCounter ++;
      battleOdds = 1;
      $(".rivalPokemon").empty();
      rivalPokemon = getRival(1, 721);
      var rivalPokemonURL = "https://pokeapi.co/api/v2/pokemon/" + rivalPokemon + "/";
      $.get(rivalPokemonURL, function(rivalData){
        rivalPokemon = rivalData.name.toUpperCase();
        rivalPokemonType = rivalData.types[rivalData.types.length-1].type.name;
        rivalTypeURL = rivalData.types[rivalData.types.length-1].type.url;
        $(".rivalPokemon").append("<h1>"+rivalPokemon+"</h1>");
        $(".rivalPokemon").append("<h2>"+rivalPokemonType.toUpperCase()+"</h2>");
      }).done(function(){
        for (type in images){
          if (type === rivalPokemonType){
            var rivalTypeImage = "url(" + images[type]+ ")";
          };
        }
        $(".rivalPokemon").css("background-image", rivalTypeImage);
      }).done(function(){
        for(i=0;i<userWeaknesses.length;i++){
          if(userWeaknesses[i] === rivalPokemonType){
            alert("Uh Oh! This isn't lookin' good... Click to see how the battle turns out!");
            battleOdds = 2;
          }
        }
        for(i=0;i<userStrengths.length;i++){
          if(userStrengths[i] === rivalPokemonType){
            alert("Lookin Good! Click to see how the battle turns out!");
            battleOdds = 3;
          }
        }
      }).done(function(){
        var outcome = Math.random();
        if(battleOdds === 1){
          alert("Fair Match! Let's see how you do!");
          if(outcome > .5){
            alert("You win!");
            winTotal ++;
          }
          else{
            alert("What an idiot. Start Over");
            winTotal = 0;
          }
        }
        else if(battleOdds === 2){
          if(outcome > .8){
            alert("You win!");
            winTotal ++;
          }
          else{
            alert("What an idiot. Start Over");
            winTotal = 0;
          }
        }
        else{
          if(outcome > .2){
            alert("You win!");
            winTotal ++;
          }
          else{
            alert("What an idiot. Start Over");
            winTotal = 0;
          }
        }
        $(".winTotal").empty();
        $(".winTotal").append("WINS: " + winTotal);
        // once you figure the order shit out(it shows, but needs to let the rival type show first), this will be a good placeholder.
        // $(".rivalPokemon").css("background-image", "url('loading.gif')");
      })
    }
    else if (distanceToDestination <= 0.0005) {
      alert("You made it! PokeMaster!")
    }
  }
  $("#selectDestination").on("click", function(event){
    desitnationAddress = desitnationAddress + $('.address').val() + "&key=AIzaSyAXu3WBe8npGIQd2KleoYLNp-hmwWqgzBQ";
    desitnationAddress = desitnationAddress.replace(/ /g,"+");
    $.get(desitnationAddress, function(addressData){
      destinationLat = addressData.results[0].geometry.location.lat;
      destinationLon = addressData.results[0].geometry.location.lng;
    })
    $(".pregame").empty();
    $(".pregame").append('<form class="choosePokemon" action="" method="post" id="selection">'+
      '<input type="number" min="1" max="721" placeholder="Enter Pokemon Number" id="textSelection">'+
      '<input type="submit" value="I Choose You!" id="submission"></form>');

  $("#selection").on("submit", function(event){
    event.preventDefault();
    $(".landingPage").css("background-image", "none");
    $(".landingPage").css("height", "auto");
    $(".displayPokemon").css("height", "90vh")
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
      $(".rivalPokemon").css("background-image", "url('loading.gif')");
      setLocation();
      newLocation();
  })
  })
  })
})
