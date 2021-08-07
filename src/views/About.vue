<template>
  <div class="about">
    <h3>How to play Hexaguessimal</h3>

    <br/>

    <p>Adjust the sliders to try to match the colors. </p>
    <p>Once you think the colors match, press the "guess" button to get feedback on how close you are. </p>
    <p>Press the "answer" button to submit your answer. You'll get +5 points for each guessed color value that's within +/- 5 from the correct color value.  You'll get +10 points for color values that are exactly correct. </p>
    <p>You'll also get a bonus +10 points if all three color values are exactly correct. </p>
  </div>

  <router-link to="/">
    Back to the game.
  </router-link>
</template>

<style scoped> 
.about {
  width: 55%;
  margin: 0px auto;
}
.about p {
  text-align: left;
}
</style>