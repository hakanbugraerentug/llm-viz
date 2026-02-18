import { Vec3 } from "@/src/utils/vector";
import { Phase } from "./Walkthrough";
import { commentary, DimStyle, IWalkthroughArgs, moveCameraTo, setInitialCamera } from "./WalkthroughTools";
import { lerp, lerpSmoothstep } from "@/src/utils/math";
import { processUpTo, startProcessBefore } from "./Walkthrough00_Intro";

export function walkthrough06_Projection(args: IWalkthroughArgs) {
    let { walkthrough: wt, state, layout, tools: { breakAfter, afterTime, c_blockRef, c_dimRef, cleanup } } = args;

    if (wt.phase !== Phase.Input_Detail_Projection) {
        return;
    }

    setInitialCamera(state, new Vec3(-73.167, 0.000, -270.725), new Vec3(293.606, 2.613, 1.366));
    let block = layout.blocks[0];
    wt.dimHighlightBlocks = [...block.heads.map(h => h.vOutBlock), block.projBias, block.projWeight, block.attnOut];

    let outBlocks = block.heads.map(h => h.vOutBlock);

    commentary(wt, null, 0)`

Self-attention sürecinden sonra, head'lerin her birinden çıktılarımız var. Bu çıktılar,
Q ve K vektörlerinin etkisiyle uygun şekilde karıştırılmış V vektörleridir.

Her head'den ${c_blockRef('çıktı vektörlerini', outBlocks)} birleştirmek için, bunları basitçe üst üste yığıyoruz. Yani,
${c_dimRef('t = 4', DimStyle.T)} zamanı için, ${c_dimRef('A = 16', DimStyle.A)} uzunluğunda 3 vektörden ${c_dimRef('C = 48', DimStyle.C)} uzunluğunda 1 vektöre gidiyoruz.`;

    breakAfter();

    let t_fadeOut = afterTime(null, 1.0, 0.5);
    // let t_zoomToStack = afterTime(null, 1.0);
    let t_stack = afterTime(null, 1.0);

    breakAfter();

    commentary(wt)`

GPT'de bir head içindeki vektörlerin uzunluğunun (${c_dimRef('A = 16', DimStyle.A)}), ${c_dimRef('C', DimStyle.C)} / num_heads'e eşit olduğunu belirtmekte fayda var.
Bu, onları tekrar bir araya yığdığımızda, orijinal uzunluğu ${c_dimRef('C', DimStyle.C)} elde etmemizi sağlar.

Buradan, katmanın çıktısını elde etmek için projeksiyon gerçekleştiriyoruz. Bu, sütun bazında basit bir matris-vektör
çarpımıdır ve bir bias eklenir.`;

    breakAfter();

    let t_process = afterTime(null, 3.0);

    breakAfter();

    commentary(wt)`

Şimdi self-attention katmanının çıktısına sahibiz. Bu çıktıyı doğrudan bir sonraki
aşamaya geçirmek yerine, onu input embedding'e eleman bazında ekliyoruz. Yeşil
dikey ok ile gösterilen bu işlem, _residual connection_ (artık bağlantı) veya _residual pathway_ (artık yolu) olarak adlandırılır.
`;

    breakAfter();

    let t_zoomOut = afterTime(null, 1.0, 0.5);
    let t_processResid = afterTime(null, 3.0);

    cleanup(t_zoomOut, [t_fadeOut, t_stack]);

    breakAfter();

    commentary(wt)`

Layer normalization gibi, residual pathway de derin
sinir ağlarında etkili öğrenmeyi mümkün kılmak için önemlidir.

Şimdi self-attention'ın sonucuyla birlikte, onu transformer'ın bir sonraki bölümüne geçirebiliriz:
feed-forward ağ.
`;

    breakAfter();

    if (t_fadeOut.active) {
        for (let head of block.heads) {
            for (let blk of head.cubes) {
                if (blk !== head.vOutBlock) {
                    blk.opacity = lerpSmoothstep(1, 0, t_fadeOut.t);
                }
            }
        }
    }

    if (t_stack.active) {
        let targetZ = block.attnOut.z;
        for (let headIdx = 0; headIdx < block.heads.length; headIdx++) {
            let head = block.heads[headIdx];
            let targetY = head.vOutBlock.y + head.vOutBlock.dy * (headIdx - block.heads.length + 1);
            head.vOutBlock.y = lerp(head.vOutBlock.y, targetY, t_stack.t);
            head.vOutBlock.z = lerp(head.vOutBlock.z, targetZ, t_stack.t);
        }
    }

    let processInfo = startProcessBefore(state, block.attnOut);

    if (t_process.active) {
        processUpTo(state, t_process, block.attnOut, processInfo);
    }

    moveCameraTo(state, t_zoomOut, new Vec3(-8.304, 0.000, -175.482), new Vec3(293.606, 2.623, 2.618));

    if (t_processResid.active) {
        processUpTo(state, t_processResid, block.attnResidual, processInfo);
    }
}
