
export const replaceNumbers = (repNum) => {
  const numbers = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };
  var output = [];
  for (var i = 0; i < repNum.length; ++i) {
    if (numbers.hasOwnProperty(repNum[i])) {
      output.push(numbers[repNum[i]]);
    } else {
      output.push(repNum[i]);
    }
  }
  return output.join("");
};


export const cascadeDate = (input) => {

  let date = replaceNumbers(input).toLowerCase();
  let reversedDate = date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0]

  const data = reversedDate.split("-")[1];

  switch (data) {
    case "০১":
      return reversedDate.replace("০১", "জানুয়ারি");
    case "০২":
      return reversedDate.replace("০২", "ফেব্রুয়ারি");
    case "০৩":
      return reversedDate.replace("০৩", "মার্চ");
    case "০৪":
      return reversedDate.replace("০৪", "এপ্রিল");
    case "০৫":
      return reversedDate.replace("০৫", "মে");
    case "০৬":
      return reversedDate.replace("০৬", "জুন");
    case "০৭":
      return reversedDate.replace("০৭", "জুলাই");
    case "০৮":
      return reversedDate.replace("০৮", "আগষ্ট");
    case "০৯":
      return reversedDate.replace("০৯", "সেপ্টেম্বর");
    case "১০":
      return reversedDate.replace("১০", "অক্টবর");
    case "১১":
      return reversedDate.replace("১১", "নভেম্বর");
    case "১২":
      return reversedDate.replace("১২", "ডিসেম্বর");
    default:
      return input;
  }
};


export const replaceTimeString = (time) => {
  if (time.split(':')[0] > 12) {
    let newTime = (time.split(':')[0] - 12) + ':' + time.split(':')[1] + ':' + time.split(':')[2]
    // alert(newTime)
    return replaceNumbers(newTime)
  } else {
    return replaceNumbers(time)
  }



}