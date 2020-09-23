export const systemSettings = {
  // server urls
  serverURL: "http://35.234.124.65:5100",
  serverCMSAuthURL:"http://35.234.124.65:5900/loginRXPCPAccount",
  serverImageURL: "http://images-dev.rxpedia.info/images/",
  serverAIURL:"http://35.234.124.65:5900/cms/ai",
  serverTNURL:"http://35.234.124.65:5900/cms/tn",
  serverShareURL:"http://35.234.124.65:5900/share",
  serverPublicURL:"http://35.234.124.65:5900/cms/public",

  // empty data
  noDataHTML:'<p class="rxp-html-nodata"><i class="icon-info"></i> No Data Entered!</p>',
  // tiny editor configurations ; Old data quickbars
  tinyEditorConfiguration : {
    height: "600px",
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'searchreplace directionality link table charmap hr  anchor lists wordcount textpattern charmap',
    toolbar: 'undo redo | bold italic underline strikethrough superscript subscript formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange permanentpen formatpainter removeformat | charmap hr | link  ltr rtl ',
    menubar: 'file edit view tools table',
    autosave_ask_before_unload: false
  }
};
