export default function AboutUs() {
  return (
    <div className="flex justify-center h-96 ">
      <div className="flex flex-col justify-center p-10  text-white bg-gradient-to-br from-amber-950 to-amber-600 shadow ">
        <h1 className="text-3xl">STORY</h1>
        <p>
          เราคัดสรรกาแฟจากทั่วทุกมุมโลกมารวมไว้ในคาเฟ่ที่มีโรงคั่วอยู่ภายในบนพื้นที่สองไร่ครึ่ง
          พร้อมแลปที่จะสร้างประสบการณ์ด้านกาแฟอย่างไม่มีวันหยุด
          เพียบพร้อมด้วยเมนูเครื่องดื่มหลากหลายให้คุณได้สัมผัสความเป็น specialty
          โดยเฉพาะเมนูซิกเนเจอร์ที่รังสรรค์มาโดยเฉพาะ
          และเพลิดเพลินกับสุดยอดเบเกอรี่ที่ผ่านการเลือกสรรมาเป็นพิเศษ
        </p>
      </div>
      <img src="src/icon/coffee_roast.jpeg" alt="story" className="w-1/2" />
    </div>
  );
}
