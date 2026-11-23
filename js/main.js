// jsを記述する際はここに記載していく

// ページの読み込みが終わってから実行する
$(function () {

  // =========================================
  // ① スクロールで画像が横からスライドしてくる
  // 画像が画面の下から200pxの位置まで来たら「is-show」を付ける
  // （動きそのものはCSSで設定している）
  // =========================================
  function slideIn() {
    var scroll = $(window).scrollTop();    // 今どこまでスクロールしたか
    var windowHeight = $(window).height(); // 画面の高さ

    $('.js-slide').each(function () {
      var position = $(this).offset().top; // 画像がページの上から何pxの位置にあるか

      // 画像の位置が「画面の下端 − 200px」より上に来たら表示
      if (scroll + windowHeight - 200 > position) {
        $(this).addClass('is-show');
      }
    });
  }

  $(window).on('scroll', slideIn); // スクロールするたびにチェック
  slideIn();                       // ページを開いた時点でも一度チェック

  // =========================================
  // ② フォームの送信チェック
  // すべて入力済み → サンクスページへ移動
  // 未入力あり   → 赤文字の注意書きを表示
  // =========================================
  $('#contact-form').on('submit', function (e) {
    e.preventDefault(); // いったん通常の送信を止める

    var isOk = true; // 全部埋まっていればtrueのまま

    // 前回のエラー表示をリセット
    $('.is-error').removeClass('is-error');

    // 名前・カナ・メール・きっかけ・詳細：空欄がないかチェック
    $('#name, #kana, #email, #trigger, #detail').each(function () {
      if ($.trim($(this).val()) === '') {
        $(this).addClass('is-error'); // 空欄の項目は枠を赤く
        isOk = false;
      }
    });

    // 志望動機：1つ以上チェックされているか
    if ($('input[name="motive"]:checked').length === 0) {
      $('.form-checks').addClass('is-error');
      isOk = false;
    }

    if (isOk) {
      // すべて入力済み → サンクスページへ
      window.location.href = 'thanks.html';
    } else {
      // 未入力あり → 注意書きを表示
      $('#form-error').addClass('is-show');
    }
  });

});