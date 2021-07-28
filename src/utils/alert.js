import { Dialog } from 'vant';

 const alert = {
   /**
    * 表示此对象的功能是否启用。
    */
   enabled: true,

   /**
    * 禁用此对象，即调用其show方法将不起任何作用。
    */
   disable() {
     this.enabled = false;
   },

   /**
    * 启用此对象，即调用其show方法将弹出一个对话框。
    */
   enable() {
     this.enabled = true;
   },

   /**
    * 弹出一个对话框。
    *
    * @param {String} title
    *     对话框的标题。
    * @param {String} content
    *     对话框中的文字内容。
    * @param {Function} nextAction
    *     可选参数，应为一个函数，表示用户点击确认后，下一步需要进行的动作。
    */
   show(title, content, nextAction) {
     if (!this.enabled) {
       return;
     }
     if (nextAction) {
       Dialog.alert({
         title,
         message: content,
       }).then(() => {
         nextAction();
       });
     } else {
       Dialog.alert({
         title,
         message: content,
       });
     }
   },
 };

 export default alert;
