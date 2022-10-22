# ELO Rating系统

概念如下：
> 每个选手在ELO Rating系统中都有一个分数来代表选手的实力水平高低，该值与用户绑定，而非与用户的某个脚本绑定。
>
> 可以通过双方的分数预测出双方获胜概率。例如，如果两个选手的rating相等，则两边获胜的预测概率都是50%。

## 预测获胜概率

如果选手A的评分为$R_{A}$，选手B的评分为$R_{B}$

选手A的预测获胜概率为：
$$
E_{A} =\frac{1}{1+10^{\frac{R_{B}-R_{A}  }{400} } }
$$
选手B的预测获胜概率为:
$$
E_{B} = 1-E_{A}
$$

## Rating规则

赛季初，每个选手的分数都是一样的（1500分），每次匹配结束后根据比赛结果调整各自rating值。

1. 胜者评分上升；败者评分下降

2. 调整公式：
   $$
   R_{A}^{′} =R_{A} +K(S_{A} −E_{A} )
   $$
   $R_{A}^{′}$​：A选手修正后的评分
   $R_{A}：$​A选手修正前的评分
   $K$​ ：一个常数，其大小直接关系到根据该公式算出的积分变化值。通常水平越高的比赛中，K越小，这样做的目的是避免少数的几场比赛就能改变高端顶尖玩家的排名

$S_{A}$​：比赛结果（A胜为1，负为0）
$E_{A}：$​A选手的预测胜利概率

3. 赛季结束，根据每位选手rating值确定最终排名。

## 实现

```
class Elorating:
    ELO_RESULT_WIN = 1
    ELO_RESULT_LOSS = -1
    ELO_RESULT_TIE = 0
 
    ELO_RATING_DEFAULT = 1500
 
    ratingA = 0
    ratingB = 0
 
    def __init__(self, ratingA = ELO_RATING_DEFAULT, ratingB = ELO_RATING_DEFAULT):
        self.ratingA = ratingA
        self.ratingB = ratingB
 
    def setResult(self, result):
        scoreAwin = self.computeScore(self.ratingA, self.ratingB)
        scoreBwin = self.computeScore(self.ratingB, self.ratingA)
 
        score_adjust = 0
        if result == self.ELO_RESULT_WIN:
            score_adjust = 1
        elif result == self.ELO_RESULT_LOSS:
            score_adjust = 0
        else:
            score_adjust = 0.5
 
        self.ratingA = self.ratingA + self.computeK(self.ratingA) * (score_adjust - scoreAwin)
        self.ratingB = self.ratingB + self.computeK(self.ratingB) * (score_adjust - scoreBwin)
 
 
    def computeK(self, rating):
        if rating >= 2400:
            return 16
        elif rating >= 2100:
            return 24
        else:
            return 36
 
 
    def computeScore(self, rating1, rating2):
        return 1 / (1+pow(10, (rating1 - rating2) / 400))
 
    pass
```
