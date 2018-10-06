// check input
function validate(id) {
  var pattern = /()/ // expect all value 

  if (id == '#user' || id == '#company') {
    pattern = /^[a-zA-ZàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịỳýỷỹỵòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊỲÝỶỸỴÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰĐ\s]+$/;
  } else if (id == '#email') {
    pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  } else if (id == '#phone') {
    pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  }

  return pattern.test($(id).val());
}

// check required fields before submit
function validateForm() {
  var fields = ['#user', '#email', '#phone', '#company'];  // #note
  var i;  

  for (i = 0; i < fields.length; i++) {
    if (!validate(fields[i])) {
      return false;  
    }
  }

  return true;
}

// set abled or disabled for submit button
function setSubmit(val) {
  if (val) {
    $('#submit').removeAttr('disabled');
  } else {
    $('#submit').attr('disabled', 'disabled');
  }
}

// error message
function errorMessage(id, error) {
  if (validate(id)) {
    $(error).html('<br>');
  } else {
    $(error).html('Invalid field!');
  }
}

$(function() { 

  $(document).on('change', ':text', function() {
    var id =  '#' + $(this).attr('id');
    var error = id + '_error';

    errorMessage(id, error);
    setSubmit(validateForm());
  });

  $(document).on('click', '#submit', function() {
    // preventDefault() or input[type=button] or return false
    $.ajax({
      url: 'https://reqres.in/api/users',
      method: 'POST',
      data: $('#form-register').serialize(),
      success : function(response) {
        alert('Sign up success!');
        console.log(response);
      }
    });
    $('#submit').attr('disabled', 'disabled'); // disable - prevent multiple form submits
    return false;
  });
  
});