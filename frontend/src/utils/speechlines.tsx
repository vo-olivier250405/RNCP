// npcDialogs.ts
export const NPC_DIALOGS = {
  TestBoy: ["Hello"],
  Catman: [
    'I am Catman. You can interact with me by typing "cat", + my name. So "cat Catman"',
    "You can use this command everywhere in this unviverse. It will be pretty useful to know more about an item.",
    "Wich universe ? The one you are in right now. Oh, I forgot, maybe just turn the lights on, try the ls command ?",
    "Thats pretty good, you can see now, but your lamp is broken, unfortunately",
    "See thoses planets ? You can explore all of them, by just typing cd + the name of the planet",
    "You can also go back to the previous zone by typing cd .., and, if you miss me, you can come back to me by typing cd /",
    "Now, you are ready to explore the universe, have fun !",
    "What ? You want to know more about me ?",
    "Sorry, the devs doesn't give me more speechlines.",
    "...see ya",
    "...see ya",
    "Oh, I forgot to tell you, you can drag the the Command input by select and move it.",
  ],
  OldMan: [
    "Hello, young traveler.",
    "Oh, my name ? I am Jean. Enjoy your life when you are young.",
    "One day, you will have the problems of an old man.",
    "For example, I lost my cat Maurice, I dont know where he is..",
    "Thank you so much ! You found my Maurice !",
  ],
  OldLady: [
    "Little brat, respect your elders. I just broke my phone. Create a new Phone for me.",
    'You dont know how to create a phone ? Sigh, just type "touch + name of the object".',
    "Oh thanks my little kid, I know you can do it !",
  ],
  Ekko: [
    "Hello, I am Ekko the Gecho. I am the great scientist of the var planet.",
    "But, someone send to me a very important message an I forgot my computer password...",
    "If only someone could help me...",
    "Do you want to ? I wrote it in the Log library, but I forgot where it is... find it for me please ! If you find it come to say it to me !",
    "So, whats the password ?",
    "...?",
    "Oh, you dont know how to talk !",
    "You don't need to speak so loud, I am not deaf...but thanks...",
  ],
  Syslog: [
    "The book is name 'The art of speaking.'",
    "You can see two mens who speak to each other. They say echo + what they want to say.",
    "Maybe you can learn something from them.",
  ],
  Authlog: ["note to myself : my password is Password."],
  Computer: [
    "Hello Ekko, I hope you find this message. As you know, we got attacked by the ---. There are so many of them, we can't hold them back.",
    "To fight them we need to find someone who is able the control the rm and mkdir commands. Please find this person.",
    "I am sorry, but I have to leave you. I will try to find a way to come back. I hope you will find a way to save us. I know you can do it. I believe in you. Good luck Ekko. I hope to see you soon.",
    "The message is over.",
  ],
  Virus: [],
  ClemouilleLaFripouille: ["Bèz ta mère"],
};

export type KeyNPC = keyof typeof NPC_DIALOGS;

export const loadDialogForNpc = (npcId: KeyNPC): string[] => {
  return NPC_DIALOGS[npcId] || [];
};

export const NPC_KEYS = Object.keys(NPC_DIALOGS);
