//  for the Zhu Cohort

import { LocationSearching } from "@material-ui/icons";

/**
  
 
 __________.__            _________                        
\____    /|  |__  __ __  \_   ___ \_______   ______  _  __
  /     / |  |  \|  |  \ /    \  \/\_  __ \_/ __ \ \/ \/ /
 /     /_ |   Y  \  |  / \     \____|  | \/\  ___/\     / 
/_______ \|___|  /____/   \______  /|__|    \___  >\/\_/  
        \/     \/                \/             \/        
 


         

         <


//\
V  \
 \  \_
  \,'.`-.
   |\ `. `.       
   ( \  `. `-.                        _,.-:\
    \ \   `.  `-._             __..--' ,-';/
     \ `.   `-.   `-..___..---'   _.--' ,'/
      `. `.    `-._        __..--'    ,' /
        `. `-_     ``--..''       _.-' ,'
          `-_ `-.___        __,--'   ,'
             `-.__  `----"""    __.-'
                  `--..____..--'
  
 **/

 const ZhuCrew = function () {
   const answer = alert('Are you a member of the Zhu Crew. Y for yes and n for no...');

    if (answer.toLowerCase() === "y") {
      console.log('Congrats on the upcoming graduation!');
    };
    if (answer.toLowerCase() === "n") {
      console.log('then why are you looking at my code?');
    };

    console.log("Thank you for your time. You can do it!");
 }; // end ZhuCrew

 export default ZhuCrew;