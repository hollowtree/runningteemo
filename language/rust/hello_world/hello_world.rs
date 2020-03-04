fn main(){
    // let _s = "Hello World!";
    // let _num = 10000;
    // println!("{}", 1<4);

    // let mut v = Vec::new();
    // v.push(1);
    // v.push(2);
    // v.push(3);
    // for i in &v{
    //     println!("{}", i)
    // }

    // struct Point {
    //     x: i32,
    //     y: i32
    // }
    // let x = 0;
    // let y = 0;
    // let p = Point {x, y};
    // println!("Point is at {} {}", p.x, p.y);

    let arr: [i32; 5] = [1,2,3,4,5];
    for item in &arr{
        println!("{}", item)
    }


}