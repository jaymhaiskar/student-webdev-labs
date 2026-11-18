// Add your code here
const calculateAge = function logAge(birthDate) {
  const birthDateObj = new Date(birthDate);
  const currentDate = new Date();

  if (isNaN(birthDateObj.getTime())) {
    return 'Error: Invalid date format';
  }

  if (birthDateObj > currentDate) {
    return 'You cannot be less than zero years old.';
  }

  let age = currentDate.getFullYear() - birthDateObj.getFullYear();
  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDateObj.getMonth();

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDateObj.getDate())) {
    age--;
  }

  if (age > 100) {
    return 'Are you sure you are more than 100 years old?';
  }

  return `You are ${age} years old`;
};

console.log(calculateAge('2000-07-01'));
// You are 25 years old
console.log(calculateAge('1988-05-18'));
// You are 38 years old
console.log(calculateAge('2190-01-01'));
// Error: Birth date cannot be in the future
console.log(calculateAge('1800-01-01'));
// Are you sure you are more than 125 years old?
console.log(calculateAge('invalid-date'));
// Error: Invalid date format

// Note: These calculations were done on May 18, 2026.
