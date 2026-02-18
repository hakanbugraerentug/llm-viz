import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, IWalkthroughArgs, setInitialCamera } from "./WalkthroughTools";

export function walkthrough08_Transformer(args: IWalkthroughArgs) {
    let { walkthrough: wt, state } = args;

    if (wt.phase !== Phase.Input_Detail_Transformer) {
        return;
    }

    setInitialCamera(state, new Vec3(-135.531, 0.000, -353.905), new Vec3(291.100, 13.600, 5.706));

    let c0 = commentary(wt, null, 0)`

Ve bu, tam bir transformer bloğu!

Bunlar herhangi bir GPT modelinin büyük kısmını oluşturur ve bir bloğun çıktısı
bir sonrakine beslenerek residual pathway'i sürdürerek birkaç kez tekrarlanır.

Derin öğrenmede yaygın olduğu gibi, bu katmanların her birinin tam olarak ne yaptığını söylemek zordur, ancak
bazı genel fikirlerimiz var: daha erken katmanlar alt seviye
özellikleri ve desenleri öğrenmeye odaklanma eğilimindedir, daha sonraki katmanlar ise daha üst seviye
soyutlamaları ve ilişkileri tanımayı ve anlamayı öğrenir. Doğal dil işleme bağlamında,
alt katmanlar gramer, sözdizimi ve basit kelime ilişkilerini öğrenebilirken, üst katmanlar
daha karmaşık anlamsal ilişkileri, söylem yapılarını ve bağlama bağlı anlamları yakalayabilir.

`;

}
