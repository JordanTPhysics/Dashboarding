import matplotlib.pyplot as plt
import os

# Sample data
topic_count = [2, 3, 4, 5, 6, 7, 8, 9, 10]
coherences = [0.31, 0.34, 0.35, 0.36, 0.37, 0.38, 0.39, 0.40, 0.41]
perplexities = [400, 350, 320, 300, 280, 270, 260, 250, 240]

fig, ax1 = plt.subplots(figsize=(10, 5))

ax1.plot(topic_count, coherences, label='Coherence', color='purple')
ax1.set_xlabel('Number of Topics')
ax1.set_ylabel('Coherence')
ax1.tick_params(axis='y', labelcolor='purple')

ax2 = ax1.twinx()
ax2.plot(topic_count, perplexities, label='Perplexity', color='green')
ax2.set_ylabel('Perplexity')
ax2.tick_params(axis='y', labelcolor='green')

fig.legend()
fig.suptitle('LDA Optimization')
plt.savefig(os.path.join('./figures/', 'lda_optimization.png'))

plt.show()