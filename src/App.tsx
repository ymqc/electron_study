import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// 引入你刚刚添加成功的 shadcn 按钮组件
import { Button } from "./renderer/src/components/ui/button";

// 定义初始节点
const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: '你好，Electron!' } },
  { id: '2', position: { x: 100, y: 250 }, data: { label: '这是 shadcn 驱动的界面' } },
];

// 定义初始连线
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 顶部工具栏 - 使用 Tailwind 和 shadcn */}
      <header className="p-4 border-b bg-white flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Electron Flow Editor</h1>
          <p className="text-xs text-muted-foreground text-slate-500">React + shadcn/ui + React Flow</p>
        </div>
        
        <div className="flex gap-2">
          {/* 测试 shadcn 按钮：添加随机节点 */}
          <Button variant="outline" size="sm" onClick={() => setNodes((nds) => [
            ...nds,
            {
              id: `${nds.length + 1}`,
              position: { x: Math.random() * 400, y: Math.random() * 400 },
              data: { label: `节点 ${nds.length + 1}` }
            }
          ])}>
            添加节点
          </Button>
          <Button size="sm">保存数据</Button>
        </div>
      </header>

      {/* 流程图主画布区域 */}
      <main className="flex-1 overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background color="#cbd5e1" gap={20} />
        </ReactFlow>
      </main>
    </div>
  );
}

export default App;