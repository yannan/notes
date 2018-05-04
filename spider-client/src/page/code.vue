<template lang="html">
  <div id="codeGenerate" class="code-container">
    <h2>二维码生成</h2>
    <div class="input-effect">
      <input type="text" v-model="codeUrl" class="effect-20" :class="hasContent">
        <label>输入网址</label>
        <span class="focus-border">
        	<i></i>
        </span>
    </div>
    <div class="sub-main">
      <button type="button" name="button" @click="generateCode" class="button-one">生成</button>
    </div>
    <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import QRCode from 'qrcode';
// var QRCode = require('qrcode');
export default {
  name: 'codeGen',
  data() {
    return {
      codeUrl: ''
    }
  },

  methods: {
    generateCode: function () {
      if (!this.codeUrl) {
        alert('请先输入需要生成的地址');
        return
      }
      QRCode.toCanvas(canvas, this.codeUrl, function (error) {
        if (error) console.error(error)
        console.log('success!');
      })
    }
  },

  computed: {
    hasContent: function () {
      return {
        'has-content': !!this.codeUrl
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .code-container {
    margin-top: 20px;

    input[type="text"]{font: 15px/24px "Lato", Arial, sans-serif; color: #333; width: 100%; box-sizing: border-box; letter-spacing: 1px;}

    .input-effect {
      position: relative;
      width: 300px;
      margin: 30px auto 20px;
      text-align: left;
    }

    /*Button One*/
    .button-one {
      text-align: center;
      cursor: pointer;
      font-size:18px;
      // margin: 0 0 0 100px;
      padding:10px 40px;
      outline: none;
      background-color: #27ae60;
      border: none;
      border-radius:5px;
      box-shadow: 0 9px #95a5a6;
      color: #ffffff;
    }

    .button-one:hover{
      background-color: #2ecc71;
    }

    .button-one:active {
      background-color: #2ecc71;
      box-shadow: 0 5px #95a5a6;
      transform: translateY(4px);
    }

    .effect-20 {
      border: 1px solid #ccc;
      padding: 7px 14px;
      transition: 0.4s;
      background: transparent;
    }

    .effect-20 ~ .focus-border:before,
    .effect-20 ~ .focus-border:after{content: ""; position: absolute; top: 0; left: 0; width: 0; height: 2px; background-color: #3399FF; transition: 0.3s;}
    .effect-20 ~ .focus-border:after{top: auto; bottom: 0; left: auto; right: 0;}
    .effect-20 ~ .focus-border i:before,
    .effect-20 ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: #3399FF; transition: 0.4s;}
    .effect-20 ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0;}
    .effect-20:focus ~ .focus-border:before,
    .effect-20:focus ~ .focus-border:after,
    .has-content.effect-20 ~ .focus-border:before,
    .has-content.effect-20 ~ .focus-border:after{width: 100%; transition: 0.3s;}
    .effect-20:focus ~ .focus-border i:before,
    .effect-20:focus ~ .focus-border i:after,
    .has-content.effect-20 ~ .focus-border i:before,
    .has-content.effect-20 ~ .focus-border i:after{height: 100%; transition: 0.4s;}
    .effect-20 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
    .effect-20:focus ~ label, .has-content.effect-20 ~ label{top: -18px; left: 0; font-size: 12px; color: #3399FF; transition: 0.3s;}

    canvas {
      margin-top: 30px;
      width: 200px;
      height: 200px;
    }
  }
</style>
