import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";

export function walkthrough05_Softmax(args: IWalkthroughArgs) {
    let { walkthrough: wt, state } = args;

    if (wt.phase !== Phase.Input_Detail_Softmax) {
        return;
    }

    setInitialCamera(state, new Vec3(-24.350, 0.000, -1702.195), new Vec3(283.100, 0.600, 1.556));

    let c0 = commentary(wt, null, 0)`

Softmax işlemi, önceki bölümde gördüğümüz gibi self-attention'ın bir parçası olarak kullanılır ve
modelin en sonunda da ortaya çıkacaktır.

Hedefi, bir vektörü alıp değerlerini toplama 1.0 olacak şekilde normalize etmektir. Ancak, basitçe
toplama bölmek kadar basit değildir. Bunun yerine, her giriş değeri önce üstellendirilir.

  a = exp(x_1)

Bu, tüm değerleri pozitif yapma etkisine sahiptir. Üstel değerlerimizin bir vektörüne sahip olduğumuzda,
her değeri tüm değerlerin toplamına bölebiliriz. Bu, değerlerin toplamının 1.0 olmasını sağlayacaktır.
Tüm üstel değerler pozitif olduğu için, sonuç değerlerin 0.0 ile 1.0 arasında olacağını biliyoruz, bu da
orijinal değerler üzerinde bir olasılık dağılımı sağlar.

Softmax için işte bu kadar: basitçe değerleri üstel hale getirin ve sonra toplama bölün.

Ancak, küçük bir komplikasyon var. Giriş değerlerinden herhangi biri oldukça büyükse, üstel
değerler çok büyük olacaktır. Büyük bir sayıyı çok büyük bir sayıya böleceğiz
ve bu, kayan noktalı aritmetikte sorunlara neden olabilir.

Softmax işleminin yararlı bir özelliği, tüm giriş değerlerine bir sabit eklersek,
sonucun aynı olacağıdır. Bu nedenle giriş vektöründeki en büyük değeri bulabilir ve tüm değerlerden
çıkarabiliriz. Bu, en büyük değerin 0.0 olmasını sağlar ve softmax sayısal olarak
kararlı kalır.

Softmax işlemine self-attention katmanı bağlamında bir göz atalım. Her softmax işlemi için giriş
vektörümüz, self-attention matrisinin bir satırıdır (ancak sadece köşegene kadar).

Layer normalization'da olduğu gibi, süreci verimli tutmak için bazı aggregation değerlerini
sakladığımız bir ara adımımız var.

Her satır için, satırdaki maksimum değeri ve kaydırılmış & üstel hale getirilmiş değerlerin toplamını saklıyoruz.
Sonra, karşılık gelen çıktı satırını üretmek için küçük bir işlem seti gerçekleştirebiliriz: maksimumu çıkar,
üstel hale getir ve toplama böl.

"Softmax" adı neyin nesi? Bu işlemin "hard" (sert) versiyonu, argmax olarak adlandırılır, sadece
maksimum değeri bulur, onu 1.0'a ayarlar ve diğer tüm değerlere 0.0 atar. Bunun aksine, softmax
işlemi bunun "daha yumuşak" bir versiyonu olarak hizmet eder. Softmax'taki üssellendirme nedeniyle,
en büyük değer vurgulanır ve 1.0'a doğru itilirken, tüm giriş değerleri üzerinde hala bir olasılık dağılımı
korunur. Bu, sadece en olası seçeneği değil, aynı zamanda diğer seçeneklerin göreceli olasılığını da
yakalayan daha nüanslı bir temsil sağlar.
`;

}
