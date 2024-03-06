
const useChangeListener = () => {

  const onChangeText = (e, getter, setter) => {
    const name = e.target.name;
    const value = e.target.value;

    setter({...getter, [name]: value})
  }

  const onChangeNumber = (e, getter, setter) => {
    const name = e.target.name;
    const value = e.target.value;

    setter({...getter, [name]: Math.abs(Number(value)).toString()})
  }

  return {onChangeText, onChangeNumber}
}

export default useChangeListener;