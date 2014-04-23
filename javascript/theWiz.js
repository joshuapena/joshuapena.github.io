$(document).ready(function(){
  
  var counter = 0;
  $('.switch').click(function(){
    counter += 1;
    
    if (counter == 1)
    {
      $('.switch').addClass("counter1");
      $("#words").text("Are the House Lights Off?");
      $("#face").text("Hit To Turn Off");
      $("#comment").text("Click");
    }
    
    if (counter == 2)
    {
      $('body').addClass("counter2");
      $("#words").text("Dorothy on Couch. Enter Aunt Em?");
      $("#face").text("Aunt Em Enter");
      $("#comment").text("Outlineing, Outlineing");      
    }
    
    if (counter == 3)
    {
      $("#words").text("Scolds Dorothy");
      $("#face").text("Sing About Feelings Once Had?");
      $("#comment").text("Feel the Feels");
    }
    
    if (counter == 4)
    {
      $("#words").text("Toto Runs Away. Go after?");
      $("#face").text("Chase");
      $("#comment").text("Dorothy Wait!");
    }
    
    if (counter == 5)
    {
      $("#words").text("Wind. More Wind?");
      $("#face").text("More Wind");
      $("#comment").text("");
    }
    
    if (counter == 6)
    {
      $("#words").text("Even More Wind?");
      $("#face").text("Even More Wind");
      $("#comment").text("");
    }
    
    if (counter == 7)
    {
      $("#words").text("Much Wind, Much Oz. See Munchkins.");
      $("#face").text("Get Closer");
      $("#comment").text("");
    }
    
    if (counter == 8)
    {
      $("#words").text("Adda Pearl appears. Who is he?");
      $("#face").text("He's the Wiz");
      $("#comment").text("");
    }
    
    if (counter == 9)
    {
      $("#words").text("Where to go?");
      $("#face").text("Yellow Brick Road");
      $("#comment").text("");
    }
    
    if (counter == 10)
    {
      $('.switch').addClass("counter9");
      $('.switch').removeClass("counter1");
      $("#words").text("An Escrow Appears and asks 'Can I win?'");
      $("#face").text("You Can't Win");
      $("#comment").text("");
    }
    
    if (counter == 11)
    {
      $("#words").text("Or get out of the Game. Can he go for a brain?");
      $("#face").text("Ease On Down");
      $("#comment").text("");
    }
    
    if (counter == 12)
    {
      $("#words").text("Escrow joined the party. See A TuneMan. Slide Power?");
      $("#face").text("Energize him");
      $("#comment").text("Don't Be Heartless");
    }
    
    if (counter == 13)
    {
      $("#words").text("TuneMan joined the party. Ease?");
      $("#face").text("Ease.");
      $("#comment").text("");
    }
    
    if (counter == 14)
    {
      $("#words").text("Return of the Ease. RAWR. It's a Lion");
      $("#face").text("Screem and Hit");
      $("#comment").text("It's mean");
    }
    
    if (counter == 15)
    {
      $("#words").text("The Lion Cowers. Asks for courage.");
      $("#face").text("Ease Again?");
      $("#comment").text("");
    }
    
    if (counter == 16)
    {
      $("#words").text("You have captured a lion. The Ease has a comeback, althought it has been here for years.");
      $("#face").text("Slow Down Song");
      $("#comment").text("");
    }
    
    if (counter == 17)
    {
      $('.switch').addClass("counter17");
      $('.switch').removeClass("counter9");
      $("#words").text("Colle-a-People. Swipe the lightsabers?");
      $("#face").text("Swipe");
      $("#comment").text("");
    }
    
    if (counter == 18)
    {
      $("#words").text("The Party Used Swipe. The Collide-A-People run away. Is the Lion strong?");
      $("#face").text("Yes, and Tall");
      $("#comment").text("");
    }
    
    if (counter == 19)
    {
      $("#words").text("He's a Lion. Wild Poppies have appeared.");
      $("#face").text("Go to Poppies");
      $("#comment").text("");
    }
    
    if (counter == 20)
    {
      $("#words").text("Police show up. Lion is high.");
      $("#face").text("Show up at Emerald City");
      $("#comment").text("");
    }
    
    if (counter == 21)
    {
      $('.switch').addClass("green");
      $('.switch').removeClass("counter17");
      $("#words").text("There is a gate and get Lion back.");
      $("#face").text("Knock. Knock.");
      $("#comment").text("");
    }
    
    if (counter == 22)
    {
      $("#words").text("No solicitors. Doorman wants payment.");
      $("#face").text("Threaten with Bone Song");
      $("#comment").text("");
    }
    
    if (counter == 23)
    {
      $("#words").text("Enter. Want to be Seen?");
      $("#face").text("In green");
      $("#comment").text("");
    }
    
    if (counter == 24)
    {
      $("#words").text("Horns sound. What's the color of the day?");
      $("#face").text("Red");
      $("#comment").text("");
    }
    
    if (counter == 25)
    {
      $('.switch').addClass("red");
      $('.switch').removeClass("green");
      $("#words").text("How to be caught for dummies?");
      $("#face").text("In bed. Red.");
      $("#comment").text("");
    }
    
    if (counter == 26)
    {
      $("#words").text("Horns sound. What is the color of gold jewlery?");
      $("#face").text("Gold");
      $("#comment").text("");
    }
    
    if (counter == 27)
    {
      $('.switch').addClass("yellow");
      $('.switch').removeClass("green");
      $("#words").text("What type of gold would a Gold rabbit wear if a Gold Rabbit could wear gold?");
      $("#face").text("The 24 carrot kind.");
      $("#comment").text("");
    }
    
    if (counter == 28)
    {
      $("#words").text("Gold?");
      $("#face").text("Gold");
      $("#comment").text("");
    }
    
    if (counter == 29)
    {
      $('.switch').addClass("green");
      $('.switch').removeClass("yellow");
      $("#words").text("What's the opposite : Large Silent. Chat Chit.");
      $("#face").text("Small talk. Chit Chat.");
      $("#comment").text("");
    }
    
    if (counter == 30)
    {
      $('.switch').addClass("red");
      $('.switch').removeClass("green");
      $("#words").text("Gossip, Scandel");
      $("#face").text("HA. HA.");
      $("#comment").text("");
    }
    
    if (counter == 31)
    {
      $('.switch').addClass("yellow");
      $('.switch').removeClass("red");
      $("#words").text("Did you hear the gossip? How do you feel?");
      $("#face").text("Envious");
      $("#comment").text("");
    }
    
    if (counter == 32)
    {
      $('.switch').addClass("green");
      $('.switch').removeClass("yellow");
      $("#words").text("RAWR. HAHAHA. Talk about the Wizard?");
      $("#face").text("Yes, with misleading and misinformed facts.");
      $("#comment").text("");
    }
    
    if (counter == 33)
    {
      $("#words").text("Oh, look at those shoes");
      $("#face").text("Scatter");
      $("#comment").text("");
    }
    
    if (counter == 34)
    {
      $("#words").text("Do you want to meet the Wizard?");
      $("#face").text("Yes, why are you asking if I am here?");
      $("#comment").text("");
    }
    
    if (counter == 35)
    {
      $("#words").text("Talk about wants. Questions the TinMan.");
      $("#face").text("Yes.");
      $("#comment").text("");
    }
    
    if (counter == 36)
    {
      $("#words").text("What?");
      $("#face").text("What.");
      $("#comment").text("");
    }
    
    if (counter == 37)
    {
      $("#words").text("Would I do, if I could feel.");
      $("#face").text("Sadness");
      $("#comment").text("");
    }
    
    if (counter == 38)
    {
      $("#words").text("Opera time. Get offered wants.");
      $("#face").text("Trickery");
      $("#comment").text("");
    }
    
    if (counter == 39)
    {
      $("#words").text("Curtain Closes. Turn on house lights?");
      $("#face").text("Yes.");
      $("#comment").text("");
    }
    
    if (counter == 40)
    {
      $('body').removeClass("counter2");
      $("#words").text("End of Act I");
      $("#face").text("");
      $("#comment").text("");
    }
  });
});
