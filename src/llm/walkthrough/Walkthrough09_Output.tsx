import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";

export function walkthrough09_Output(args: IWalkthroughArgs) {
    let { walkthrough: wt, state } = args;

    if (wt.phase !== Phase.Input_Detail_Output) {
        return;
    }

    setInitialCamera(state, new Vec3(-20.203, 0.000, -1642.819), new Vec3(281.600, -7.900, 2.298));

    let c0 = commentary(wt, null, 0)`

Son olarak, modelin sonuna geliyoruz. Son transformer bloğunun çıktısı bir
layer normalization'dan geçirilir ve sonra bir lineer dönüşüm (matris çarpımı) kullanırız, bu sefer bias olmadan.

Bu son dönüşüm, her sütun vektörümüzü C uzunluğundan nvocab uzunluğuna götürür. Dolayısıyla,
etkin bir şekilde kelime dağarcığındaki her kelime için her sütunumuz için bir skor üretir. Bu
skorların özel bir adı vardır: logit'ler.

"Logit" adı "log-odds"dan, yani her token'ın olasılıklarının logaritmasından gelir. "Log"
kullanılır çünkü bir sonraki adımda uyguladığımız softmax, "odds" veya olasılıklara dönüştürmek için bir üstel fonksiyon yapar.

Bu skorları güzel olasılıklara dönüştürmek için onları bir softmax işleminden geçiriyoruz. Şimdi,
her sütun için, modelin kelime dağarcığındaki her kelimeye atadığı bir olasılığa sahibiz.

Bu özel modelde, üç harfi nasıl sıralayacağı sorusunun tüm cevaplarını etkin bir şekilde öğrenmiştir,
bu yüzden olasılıklar doğru cevaba doğru ağırlıklı olarak yönlendirilmiştir.

Modeli zaman içinde ilerletirken, diziye eklenecek bir sonraki token'ı belirlemek için son sütunun olasılıklarını kullanırız.
Örneğin, modele altı token verdiysek, 6. sütunun çıktı olasılıklarını kullanacağız.

Bu sütunun çıktısı bir dizi olasılıktır ve dizide bir sonraki olarak kullanmak için bunlardan birini seçmemiz gerekir.
Bunu "dağılımdan örnekleme" yaparak yaparız. Yani, token'ı rastgele seçeriz, olasılığına göre ağırlıklandırılır.
Örneğin, 0.9 olasılığa sahip bir token zamanın %90'ında seçilecektir.

Ancak burada başka seçenekler de vardır, örneğin her zaman en yüksek olasılığa sahip token'ı seçmek.

Bir temperature (sıcaklık) parametresi kullanarak dağılımın "düzgünlüğünü" de kontrol edebiliriz. Daha yüksek bir
temperature dağılımı daha düzgün hale getirecek ve daha düşük bir temperature onu en yüksek olasılıklı token'lara
daha konsantre hale getirecektir.

Bunu, softmax'ı uygulamadan önce logit'leri (lineer dönüşümün çıktısı) temperature'a bölerek yaparız.
Softmax'taki üssellendirme büyük sayılar üzerinde büyük bir etkiye sahip olduğundan,
hepsini birbirine daha yakın hale getirmek bu etkiyi azaltacaktır.
`;

}
